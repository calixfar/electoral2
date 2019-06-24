import React, { Component, Fragment } from 'react'
import {Mutation, Query} from 'react-apollo'
import {CREAR_BARRIO} from './../../mutations'
import memoize from 'memoize-one'

const initialState = {
    id:'',
    nombre: '',
    nombreError: '',
    cantidadVotantes: '',
    cantidadVotantesError: '',
    estado: '',
    estadoError: '',
    error: false
}

export default class FormBarrio extends Component {
    state = {
        ...initialState,
        zona: this.props.zona,
        reset : this.props.reset
    }
    // componentWillReceiveProps(nextProps)
    editarBarrio = memoize(barrio => barrio)
    memoizeReset = memoize(reset => reset)
    cont = 1
    changeReset = () => {
        if(this.state.reset === true){
            this.setState({reset: false})
        }
    }
    actualizarBarrio = () => {
        const barrio= this.editarBarrio(this.props.editarBarrio)
        const reset = this.memoizeReset(this.props.reset)
        console.log('reset,',reset)
        if(barrio.id != this.state.id){
             this.cont = 1
        }
        
        console.log('barrioActualziar',barrio)
        if(reset === false){
            if((barrio.id != '' || barrio.id!= this.state.id) && this.cont === 1){
                console.log('cambio')
                this.setState({
                    ...barrio
                })
                if(barrio.id === this.state.id) this.cont +=1
            }
        }
        console.log('contador', this.cont)
    }   
    updateState = (e) => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }
    nombresBarrios = []
    fillNameBarrios = () => {
        this.props.barrios.map(nombre => {
            if(!this.nombresBarrios.includes(nombre.nombre.toLocaleLowerCase())){
                this.nombresBarrios.push(nombre.nombre.toLocaleLowerCase())  
            }
        })   
    } 
    error= true
    setError = () => {
        let error = 0
        const errors= {}
        const {nombre,estado,cantidadVotantes} = this.state
        if (nombre === '') {
            error += 1
            errors.nombreError = 'El campo no puede estar vacío'
        } else {
            error -= 1
            errors.nombreError = ''
        }
        if (estado === '' || estado === 'Elegir...'){
            error += 1
            errors.estadoError = 'El campo no puede estar vacío'
        }else {
            error -= 1
            errors.estadoError = ''
        }
        if (cantidadVotantes === '') {
            error += 1

            errors.cantidadVotantesError = 'El campo no puede estar vacío'
        }else {
            error -= 1
            errors.cantidadVotantesError = ''
        }
        if(this.nombresBarrios.includes(nombre.toLocaleLowerCase())){
            error +=1
            errors.nombreError = 'El nombre ya ha sido asignado a un barrio'
        }else {
            error -= 1
            errors.nombreError = (errors.nombreError)? errors.nombreError : ''
        }
        if(error  !== 0){
            this.setState({
                ...this.state,
                ...errors,
                error
            })
        } 
        return error
        
    }
    resetState = () => {
        this.setState({
            ...initialState,
            reset: true
        })
    }
    nuevoBarrio = (e, crearBarrio) => {
        e.preventDefault();
        let validacion = this.setError()
        if(validacion <= 0){
            const {nombre,cantidadVotantes,estado} = this.state
            const zona = this.props.zona
            const input = {
                nombre,
                estado,
                cantidadVotantes: Number(cantidadVotantes),
                zona
            }
            const variables = {input}
            crearBarrio({variables}).then(data => {
                this.resetState()
            })
        }
    }
    render() {
        const {nombre,cantidadVotantes,estado} = this.state
        return (
           <Fragment>
               {this.actualizarBarrio()}
               {this.fillNameBarrios()}
               <div className="ibox">
                    <div className="ibox-title">
                        <h5>Agregar Barrio</h5>
                    </div>
                    <div className="ibox-content mb-3 border-bottom">
                        <div className="row">
                                <Mutation mutation={CREAR_BARRIO}>
                                    {(crearBarrio, {data}) => (
                                        <Fragment>
                                            <form 
                                                className="d-flex col-md-12"
                                                onSubmit={e => this.nuevoBarrio(e, crearBarrio)} >
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label">
                                                            Nombre del barrio:
                                                        </label>
                                                        <input 
                                                            onChange={e => this.updateState(e)} 
                                                            name="nombre" 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Ingrese un nombre"
                                                            value={nombre}
                                                        />
                                                        <span className="text-danger">{this.state.nombreError} </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label">
                                                            Cantidad Habitantes:
                                                        </label>
                                                        <input 
                                                            onChange={e => this.updateState(e)} 
                                                            name="cantidadVotantes" 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="Ingrese la cantidad"
                                                            value={cantidadVotantes}
                                                        />
                                                        <span className="text-danger">{this.state.cantidadVotantesError} </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="col-form-label">
                                                            Última visita:
                                                        </label>
                                                        <select 
                                                            onChange={e => this.updateState(e)} 
                                                            name="estado" 
                                                            className="form-control" 
                                                            placeholder="Elegir Estado"
                                                            value={estado}
                                                        >
                                                            <option>Elegir...</option>
                                                            <option value="esta semana">Esta semana </option>
                                                            <option value="mas de una semana">Más de una semana</option>
                                                            <option value="mas de un mes">Más de un mes </option>
                                                        </select>
                                                        <span className="text-danger">{this.state.estadoError} </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                                    <div className="form-group" style={{width: '100%', margin: '0'}}>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-success btn-block"
                                                            onClick={this.resetState}
                                                        >Limpiar Campos</button>                       
                                                        <button 
                                                            className="btn btn-block btn-primary"  
                                                            type="submit"
                                                        >Registrar
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Fragment>
                                    )}
                                                            
                                </Mutation>
                        </div>
                    </div>
                </div>
           </Fragment>
        )
    }
}
