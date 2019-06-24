import React, { Component, Fragment } from 'react'
import { WrapperContent } from '../../layout/WrapperContent';
import { TitleContent } from '../../layout/TitleContent';
import FormMacro from '../forms';
import { Tabla, SubPersonTable } from '../tabla'
import { Query } from 'react-apollo'
import { OBTENER_PERSONAS } from './../../../queries'
import { Spinner } from './../../utilidades/Spinner'

export default class Macro extends Component {
    PersonasMacro = React.createContext();
    state = {
        lider: 6,
        multi: 6,
        votante: 6,
        macro: 12,
        personas: {
            tipo: '',
            id: '',
            nombre: ''
        },
        firstRender: true,
        idSelect: '',
        title: '',
        typeFilter: 'macro',
        actual: 1,
        limite: 5,
        offset: 0,
        input: {},
        valueSearch: '',
        typeInput: 'cedula',
        click: false,
        inputSend: {}
    }
    totalPersonas = 0;
    changeType = e => this.setState({
        typeFilter: e.target.value,
        actual: 1,
        offset: 0
    })
    
    paginaSiguiente = () => {
        this.setState({
        actual: this.state.actual +1,
        offset: this.state.offset + this.state.limite
        })
    }
    paginaAnterior = () => this.setState({
        actual: this.state.actual - 1,
        offset: this.state.offset - this.state.limite
    })
    paginaNumber = (e) => {
        console.log("actual1", this.state.actual)
        this.setState({
            actual: e,
            offset: (e - 1) * this.state.limite
        })
    }
    changeSubPersona = (tipo, id, nombre) => {
        this.setState({personas: {tipo, id, nombre}, macro: 7, idSelect: id})
    }

    setPersona = (personas) => {
        if(this.state.firstRender) this.setState({personas, firstRender : false})
    }
    tableSelect = () => {
        if(this.state.personas.id !== ''){
            let {tipo} = this.state.personas
            let title = tipo === 'macro' ? 'Macro campañas' : tipo === 'lider' ? 'Lideres' : tipo === 'multip' ? 'Multiplicadores' : 'Votantes'
            return (
                <SubPersonTable closeSubTable={this.closeSubTable} data={this.state.personas} title={`${title} de ${this.state.personas.nombre}`} />
            )
        }
        else return ''
    }
    changeInput = (value) => {
        let input = {};
        input[this.state.typeInput] = value;
        this.setState({
            input,
            valueSearch: value
        })
        if(value === ''){
            this.setState({
                input: {},
                inputSend: {}
            })
        }
    }
    changeTypeInput = (value) =>{
        this.setState({
            typeInput: value,
            input: {},
            inputSend: {},
            valueSearch: '',
        })
    }
    clickSearch = () => {
        if(this.state.valueSearch === ''){
            alert('El campo no puede estar vacío')
        } else{
            let obj = {
                tipo: this.state.typeFilter
            }
            let inputSend = Object.assign(obj, this.state.input)
            this.setState({
                click: true,
                inputSend,
                actual: 1,
                offset: 0
            })
        }
    }
    
    closeSubTable = () => this.setState({personas: {}, macro: 12})
    content = () => {
        // let visibleLider = this.state.ancho.lider === 0 ? 'none' : 'block';
        // let visibleMulti = this.state.ancho.multi === 0 ? 'none' : 'block';
        // let visibleVotante = this.state.ancho.votante === 0 ? 'none' : 'block';
        let input = this.state.inputSend
        input.tipo = this.state.typeFilter
        console.log(input)
        // input['tipo'] = this.state.typeFilter;
        // console.log(input)
        return (
            <Fragment>
                <div className="row">
                        <Query 
                            query={OBTENER_PERSONAS} 
                            pollInterval={500} 
                            variables={{ 
                                input, 
                                limite: this.state.limite, 
                                offset: this.state.offset 
                            }}
                        >
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if (loading) return <Spinner />
                                if (error) return `Error: ${error.message}`
                                this.totalPersonas = data.totalPersonas
                                return (
                                    <Fragment>
                                        {/* <div className="row"> */}
                                            <div className={`col-md-${this.state.macro}`}>
                                                <Tabla
                                                    key="tablaGeneral" 
                                                    type={this.state.typeFilter} 
                                                    changeType={this.changeType} 
                                                    idSelect={this.state.idSelect} 
                                                    width={this.state.macro} 
                                                    changeSubPersona={this.changeSubPersona} 
                                                    filter="macro" 
                                                    data={data.obtenerPersonas} 
                                                    titulo="Macros" 
                                                    limite = {this.state.limite}
                                                    total={this.totalPersonas} 
                                                    siguiente={this.paginaSiguiente}
                                                    actual={this.state.actual}
                                                    anterior={this.paginaAnterior}
                                                    numeroPagina={this.paginaNumber}
                                                    changeInput={this.changeInput}
                                                    changeTypeInput={this.changeTypeInput}
                                                    valueInput={this.state.valueSearch}
                                                    valueTypeInput={this.state.typeInput}
                                                    clickSearch={this.clickSearch}
                                                />
                                            </div>
                                            <div style={{display: this.state.personas.superior === '' ? 'none' : 'block'}} className={`col-md-${12 - this.state.macro}`}>
                                                {this.tableSelect()}
                                            </div>
                                        {/* </div> */}
                                    </Fragment>
                                        )
                            }}
                        </Query>
                        
                </div>
            </Fragment>
        )
    }
    render() {
        return (
            <Fragment>
                <TitleContent title="Campañas" subtitle="lista" />
                <WrapperContent content={this.content} />

            </Fragment>
        )
    }
}
