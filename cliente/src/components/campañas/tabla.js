import React, { useState} from 'react'
import {Link} from 'react-router-dom'
import { Query } from 'react-apollo'
import {OBTENER_PERSONAS_SUPERIOR, OBTENER_PERSONAS, OBTENER_PERSONAS_CAMPAÑA, OBTENER_BARRIO } from '../../queries'
import { Spinner } from '../utilidades/Spinner';
import Paginador from './../utilidades/Paginador'

//Sabar tipo de persona dependiendo del titulo de la tabla de la lista
const saberTipo = (tipo) =>  tipo ==='MA' ? 'macro' : tipo ==='L' ? 'lider' : tipo ==='MU' ? 'multip' : 'votante'

//Calcular todos las personas fidelizadas o no de un candidato 

const totalPersonasFidelizadas = (id) => {

}
//Tabla que muestra los subintegrantes de cierta persona 
export const SubPersonTable = (props) => {
    const {title} = props
    if(Object.keys(props.data).length > 0){
        const {id, tipo} = props.data
        return(
            <div className="col-md-12">
                <div className="ibox">
                    <div className="ibox-title">
                        <h5>{title}</h5>
                        <div className="ibox-tools">
                            <a onClick={() => props.closeSubTable() } className="close-link"><i className="fa fa-times"></i></a>
                        </div>
                    </div>
                    <div className="ibox-content">
                        <div className="project-list">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Meta Votos</th>
                                        <th>VT / F</th>
                                        <th>Margen</th>

                                    </tr>
                                </thead>
                                <Query query={OBTENER_PERSONAS_SUPERIOR} variables={{input: {id, tipo}}}>
                                    {({loading, error, data}) => {
                                        if(loading) return <Spinner/>
                                        if(error) return `Error: ${error.message}`
                                        console.log('data',data)
                                        return (
                                            <tbody>
                                                {data.obtenerPersonasSuperior.map((persona, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td>{persona.nombre} {persona.apellido}</td>
                                                            <td>{efectIcon(`${persona.metaVotos}`, 'fa-line-chart')}</td>
                                                            <td>{persona.totalGeneral.totalPersonas} / {persona.totalGeneral.totalFidelizados}</td>
                                                            <td>{Number(persona.totalGeneral.totalPersonas) - Number(persona.totalGeneral.totalFidelizados)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        )
                                    }}
                                </Query>
                            </table>
                        </div>
    
                    </div>
                </div>
    
            </div>
        )
    } else {
        // const message = 'No tiene ' +title.substring(0, title.indexOf(' '));
        // <h2>{message}</h2>
        return ''
    }
    
}

//Funcion con icono arriba y texto abajo
let efectIcon = (content, classIcon) => (
    <div className="row">
        <div className="col-md-12 text-center">
            <i className={`fa ${classIcon}`}></i>
        </div>
        <div className="col-md-12 text-center">
            {content}
        </div>
    </div>
)
export const Tabla = (props) => {

    let nameBarrio = (id) => (
        <Query query={OBTENER_BARRIO} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Cargando...'
                if (error) return `Error: ${error.message}`
                console.log(data)
                return data.obtenerBarrio === null ? <span>No registrado</span>: 
                <span>{data.obtenerBarrio.nombre}</span>
            }}
        </Query>
    )

   
    let contactState = (state) => (
        state === 'MASSEMANA'? efectIcon('VISITADO HACE MÁS DE UNA SEMANA', 'fa-warning') :
        state === 'SEMANA'? efectIcon('VISITADO ESTA SEMANA', 'fa-check'): efectIcon('VISITADO HACE MÁS DE UN MES', 'fa-times')
    )
    let colorContactState = (state) => (
        state === 'MASSEMANA'? 'text-warning' : state === 'SEMANA'? 'text-info' :  'text-danger'
    )
    let tableCantidadIntegrantes = (array, id, nombre) => (array.map((thead, i) => 
        <td key={i}>
            <span 
            title={saberTipo(thead)} 
            style={{ cursor: 'Pointer' }} 
            onClick={() => {
                props.changeSubPersona(saberTipo(thead), id, nombre)
            }}
            >{thead}</span>
        </td> ))
    let table = () =>  (props.width === 12) ? tBodyComplete() : tBodySubComplete()
    let colorSelectRow = id => id === props.idSelect ? '#BBE5F6' : 'white'
    let diferenciaVotos = (total, fidelizados) => total-fidelizados === 0 ? 
        <span className="badge badge-primary">0</span> : <span className="badge badge-danger">{total-fidelizados}</span>
    let tBodySubComplete = () => (
        <tbody>
            {props.data.map((person, i) => {
                console.log(props.data)
                 return (
                    <tr style={{backgroundColor: colorSelectRow(person.id)}} className={`mb-2 `} key={i} >
                        <td>{person.nombre} {person.apellido}</td>
                        <td>{efectIcon(`Meta votos ${person.metaVotos ? person.metaVotos : 0 }`, 'fa-line-chart')}</td>
                        <td>
                            <small>Votos Macros</small><br></br>
                            <span>
                                {person.totalGeneral.totalGeneralMacros.totalPersonas}/ 
                                {person.totalGeneral.totalGeneralMacros.totalFidelizados} <br></br> 
                                {' ' } {diferenciaVotos(person.totalGeneral.totalGeneralMacros.totalPersonas, 
                                    person.totalGeneral.totalGeneralMacros.totalFidelizados)}
                            </span>
                        </td>
                        <td>
                            <small>Votos Lideres</small><br></br>
                            <span>
                                {person.totalGeneral.totalGeneralLideres.totalPersonas} / 
                                {person.totalGeneral.totalGeneralLideres.totalFidelizados} <br></br> 
                                {' ' } {diferenciaVotos(person.totalGeneral.totalGeneralLideres.totalPersonas, 
                                    person.totalGeneral.totalGeneralLideres.totalFidelizados)}
                            </span>
                        </td>
                        <td>
                            <small>Votos Multip</small><br></br>
                            <span>
                                {person.totalGeneral.totalGeneralMultip.totalPersonas} / 
                                {person.totalGeneral.totalGeneralMultip.totalFidelizados} <br></br> 
                                {' ' } {diferenciaVotos(person.totalGeneral.totalGeneralMultip.totalPersonas, 
                                    person.totalGeneral.totalGeneralMultip.totalFidelizados)}
                            </span>
                        </td>
                        <td>
                            <small>Votos Votanes</small><br></br>
                            <span>
                                {person.totalGeneral.totalGeneralVotantes.totalPersonas} / 
                                {person.totalGeneral.totalGeneralVotantes.totalFidelizados} <br></br> 
                                {' ' } {diferenciaVotos(person.totalGeneral.totalGeneralVotantes.totalPersonas, 
                                    person.totalGeneral.totalGeneralVotantes.totalFidelizados)}
                            </span>
                        </td>
                        <td>
                            <small>Votos Totales</small><br></br>
                            <span>
                                {person.totalGeneral.totalPersonas} / 
                                {person.totalGeneral.totalFidelizados} <br></br> 
                                {' ' } {diferenciaVotos(person.totalGeneral.totalPersonas, 
                                    person.totalGeneral.totalFidelizados)}
                            </span>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
    let Input = (value) => (
        <input
            onChange={e => {
                let value = e.target.value
                if(isNaN(parseInt(value)) === false && props.valueTypeInput === 'nombre' ){
                    value = ''
                }
                props.changeInput(value)
            }} 
            type={props.valueTypeInput === 'cedula' ? 'number': 'text'} 
            placeholder="Búsqueda por cedúla" 
            className="form-control"
            value = {props.valueInput}
            autoFocus
        />
    )
    //let valorInputSearch =  Object.getOwnPropertyNames(props.valueInput).includes('nombre') ? 
         //props.valueInput.nombre : props.valueInput.cedula
    //console.log('value searc', valorInputSearch)
    let tBodyComplete = () => (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                        <select
                            value={props.valueTypeInput} 
                            className="form-control"
                            onChange={e => {
                                props.changeTypeInput(e.target.value)
                            }}
                        >
                            <option value="cedula">Cedúla</option>
                            <option value="nombre">Nombre</option>
                        </select>
                    </div>
                    <div className="col-md-10 input-group mb-3">
                        <Input value={props.valueInput}/>
                        <span className="input-group-btn">
                            <button
                                onClick={props.clickSearch} 
                                className="btn btn-primary"

                            ><i className="fa fa-search"></i> Buscar</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-2">
                <span><strong>Total: {props.total}</strong></span>
            </div>
            <div className="col-md-12">
                <tbody>
                    {props.data.map((person, i) => {
                        return (
                            <tr className="mb-2" key={i}>
                                <td><img style={{ width: '20px', height: '20px' }} src="./../../img/avatar.png" /></td>
                                <td>{person.nombre} {person.apellido}</td>
                                <td>{efectIcon(person.ocupacion, 'fa-suitcase')} </td>
                                <td>{efectIcon(person.celular, 'fa-phone')}</td>
                                <td>{efectIcon(nameBarrio(person.barrio), 'fa-map-marker')}</td>
                                <td className={colorContactState(person.estadoContacto)}>{contactState(person.estadoContacto)}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-md-12 text-center mb-1">
                                            <span >Cantidad Integrantes</span>
                                        </div>
                                        <div className="col-md-12">
                                            <table style={{ position: 'relative', top: '-5px' }}>
                                                <thead>
                                                    <tr>{tableCantidadIntegrantes(['MA','L','MU','V'], person.id, person.nombre)}</tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">{person.macros.length}</td>
                                                        <td className="text-center">{person.lideres.length}</td>
                                                        <td className="text-center">{person.multip.length}</td>
                                                        <td className="text-center">{person.votantes.length}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                                <td>{efectIcon(`Meta votos ${person.metaVotos ? person.metaVotos : 0}`, 'fa-line-chart')}</td>
                                <td>{person.fidelizado ? <label className="badge badge-primary">FIDELIZADO</label> : <label className="badge badge-danger">NO FIDELIZADO</label>}</td>
                                <td style={{margin: '0'}}>
                                    <Link to={`/perfil/${person.id}/${person.nombre} ${person.apellido}`} className="btn btn-success"><i className="fa fa-eye"></i></Link>
                                    {/* <button className="btn btn-danger"><i className="fa fa-trash"></i></button> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </div>
        </div>
    )
    let type = ''
    let FillTableMacro = (macro) => {
        if (props.data) {
            return (
                <div className="ibox col-md-12">
                    <div className="ibox-title">
                        <h5>Lista integrantes</h5>
                        <div className="ibox-tools">
                            <select 
                                onChange={e => props.changeType(e)}
                                value={props.type}
                            >
                                <option value="macro">Macros</option>
                                <option value="lider">Lideres</option>
                                <option value="multiplicador">Multiplicadores</option>
                                <option value="votante">votantes</option>
                            </select>
                        </div>
                    </div>
                    <div className="ibox-content">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                {table()}
                            </table>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center">
                            <Paginador
                                limite={props.limite}
                                total={props.total}
                                actual={props.actual}
                                siguiente={props.siguiente}
                                anterior={props.anterior}
                                numeroPagina={props.numeroPagina}
                            />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ibox col-md-12">
                    <div className="ibox-title">
                    <div className="ibox-tools">
                                <div className="form-group">
                                    <span>Tipo de lista  </span>
                                    <select
                                        value = {props.type}
                                        onChange={e => {
                                            type= e.target.value
                                            props.changeType(e);
                                        }}
                                    >
                                        <option value="macro">Macros</option>
                                        <option value="lider">Lideres</option>
                                        <option value="multiplicador">Multiplicadores</option>
                                        <option value="votante">Votantes</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    <div className="ibox-content">
                        <h1 className="text-center">No hay personas registradas</h1>
                    </div>
                </div>
            )
        }

    }
    return (
        <FillTableMacro macro={1} />
    )
}