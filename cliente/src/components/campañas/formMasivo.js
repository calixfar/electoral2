import React, { Component, useState } from 'react'
import XLSX from 'xlsx';
import { Query, Mutation } from 'react-apollo'
import {CREAR_PERSONA_MASIVO} from './../../mutations'
import { VALIDAR_CEDULA, OBTENER_PERSONAS,OBTENER_BARRIOS } from './../../queries'
//import {validarCedula} from './../utilidades/validarCedula'

export const FormMasivo = () => {
    const [arrayValide, setArrayValide] = useState();
    const [arrayBarrios, setArrayBarrios] = useState();
    let validarCedula = (cedula) => (
        <Query query={VALIDAR_CEDULA} variables={{ cedula }}>
            {({ loading, error, data }) => {
                if (loading) return 'Cargando'
                if (error) return 'error'
                console.log(data)
                setArrayValide(data.validarCedula)
                console.log('arrrayrayValidate1', arrayValide)
                return <h1></h1>
            }}
        </Query>
    )
    let validarNameBarrio = (nombre, array) => {
        console.log('n',nombre, 'array', array)
        let res = null;
        array.map(barrio => {
            if(barrio.nombre.toLowerCase() === nombre.toLowerCase()) res = barrio.id;
        })
        console.log('id', res)
        return res;
    }
    let newArray= []
    let getBarrios = (array) => (
        <Query query={OBTENER_BARRIOS}>
            {({ loading, error, data, refetch }) => {
                if (loading) return 'Cargando...'
                if (error) return ('Error: ' + error.message)
                array.map((person,i) => {
                    let validar = validarNameBarrio(person.barrio, data.obtenerBarrios)
                    console.log('prueba',validar)
                    newArray.push(person)
                    if(validar === null){
                        delete newArray[i].barrio
                    }
                })
                console.log('new', newArray)
                // array.map((person, i) => {
                //     console.log('barrio',person)
                //     let valide = validarNameBarrio(person.barrio, data.obtenerBarrios)
                //     newArray.push(person)
                //     newArray[i].barrio = valide
                // })
                // console.log('arrayBarrios', newArray)
                // setArrayBarrios(1)
                return <h1></h1>
            }}
        </Query>
    )
    const [array, setArray] = useState([]);
    const [arrayError, setArrayError] = useState([]);

    let validarCedularResponse = (response, cedula) => {
        let respuesta = false, cont = 0;
        response.forEach((res, i) => {
            if (res.includes(cedula)) {
                respuesta = true
            }

        })
        return respuesta
    }
    let convertArrayInputs = (array) => {
        console.log('arrayinputs', array)
        let input = {
            cedula: '',
            nombre: '',
            apellido: '',
            fechaCumple: '',
            genero: '',
            estadoCivil: '',
            perfil: '',
            ocupacion: '',
            celular: '',
            direccion: '',
            correo: '',
            barrio: '',
            estadoContacto: '',
            lugarVotacion: '',
            mesaVotacion: '',
            metaVotos: '',
            dinero: '0',
            fidelizado: '',
            tipo: '',
        }
        let arrayName= ['cedula', 'nombre','apellido','fechaCumple','genero','estadoCivil','perfil',
            'ocupacion','celular', 'direccion','correo','barrio','estadoContacto','lugarVotacion',
            'mesaVotacion','metaVotos','dinero','fidelizado','tipo']
        let response = []
        array.map(person => {
            person.map((field,i) => {
                if(arrayName[i] === 'fidelizado') field = (field === 'SI') ? true : false;
                input[arrayName[i]] = field;
            })
            response.push(input)
            input = {}
        })
        return(response)
    }
    let InputFile = () => {
        return (
            <input
                type="file"
                onChange={(e) => {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(e.target.files[0]);
                    reader.onload = (e) => {
                        let data = new Uint8Array(reader.result);
                        let wb = XLSX.read(data, { type: 'array' })
                        let colum = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
                        let responseError = [], response = [], row = [], max = Math.round(Object.keys(wb.Sheets.Hoja1).length / colum.length);
                        
                        if (max > 1) {
                            for (let i = 2; i <= max; i++) {
                                for (let j = 0; j < colum.length; j++) {
                                    (colum[j] === 'O' || colum[j] === 'P') ?
                                    row.push(Number(wb.Sheets.Hoja1[`${colum[j]}${i}`].w)):
                                    row.push(wb.Sheets.Hoja1[`${colum[j]}${i}`].w)
                                }
                                if (validarCedularResponse(response, row[0]) !== true && row[0].length > 7) {
                                    response.push(row)
                                }
                                else {
                                    if (validarCedularResponse(responseError, row[0]) !== true && row[0].length > 7) {
                                        responseError.push(row)
                                    }
                                }
                                row = [];
                            }
                            setArrayError(convertArrayInputs(responseError))
                            setArray(convertArrayInputs(response))
                        }
                    }
                }}
            ></input>
        )
    }
    let spanFidelizado = (fidelizado) => {
        if(fidelizado) return <span className="label label-primary">FIDELIZADO</span>
        else return <span className="label label-danger">NO FIDELIZADO</span>
    }
    let fillTable = (array) => {
        return(
            <tbody>
                {array.map(person => (
                    <tr key={person.cedula}>
                        <td>{person.cedula}</td>
                        <td>{person.nombre} {person.apellido}</td>
                        <td>{person.genero}</td>
                        <td>{person.fechaCumple}</td>
                        <td>{person.ocupacion}</td>
                        <td>{person.celular}</td>
                        <td>{person.tipo}</td>
                        <td>{spanFidelizado(person.fidelizado)}</td>
                    </tr>
                ))}
            </tbody>
        )
    }
    let TableContent = () => {
        if (arrayError) {
            if (array.length > 0) {
                console.log('arraysadas', array)
                return (
                    <div>
                        <table className="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Cedúla</th>
                                    <th>Nombre</th>
                                    <th>Género</th>
                                    <th>Fecha Cumple</th>
                                    <th>Ocupación</th>
                                    <th>Celular</th>
                                    <th>Tipo</th>
                                    <th>Fidelizado</th>
                                </tr>
                            </thead>
                            {fillTable(array)}
                            {getBarrios(array)}
                        </table>
                        <div className="col-md-12 justify-content-center d-flex">
                            <Mutation variables={{input:{datos: newArray}}} mutation={CREAR_PERSONA_MASIVO}>
                                {registroMasivoPersonas => (
                                    <button 
                                        className="btn btn-primary col-md-6"
                                        onClick={ e => registroMasivoPersonas() }
                                    
                                    >Cargar Registros</button>
                                )}
                            </Mutation>
                        </div>
                    </div>
                )
            } else return ''
        } else return <h1>Hay errores {arrayError.length}</h1>
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <InputFile />
            </div>
            <div className="col-md-12">
                <TableContent />
            </div>
        </div>
    )
}

