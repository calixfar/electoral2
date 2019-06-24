import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { CREAR_BARRIO } from './../../mutations'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Swal from 'sweetalert2'

const initialSate = {
    id:'',
    nombre: '',
    nombreError: '',
    cantidadVotantes: '',
    cantidadVotantesError: '',
    estado: '',
    estadoError: '',
    error: false
}
export default class ModalActualizarBarrio extends Component {
    state = {
        ...this.props.barrio,
        error: false
    }
    showCrear = React.createRef();
    close = React.createRef();
    notificationDOMRef = React.createRef();
    showNotify = React.createRef();
    showAlert = () => {
        Swal.fire(
            `Se actualizo la zona correctamente!`,
            'Click para continuar!',
            'success'
          )
    }
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
            ...this.props.barrio
        })
    }
    showModal = () => {
        this.showCrear.current.click();
    }
    
    crearBarrio = (e,crearBarrio) => {
        const { nombre, estado, cantidadVotantes } = this.state
        const {id} = this.props
        const input = {
            nombre,
            estado,
            cantidadVotantes : Number(cantidadVotantes),
            id
        }
        e.preventDefault();
            crearBarrio({variables: {input}}).then(data => {
                this.close.current.click()
                this.showAlert()
                this.resetState()
            })
        
    }
    updateState = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }
    
    
    alertDanger = () => {
        if (this.state.nombre === '') {
            return (
                <div className="alert alert-danger alert-dismissable">
                    <button aria-hidden="true" data-dismiss="alert" className="close" type="button">×</button>
                    {this.state.nombreError} 
                </div>
            )
        }
    }

    render() {
        const { nombre, estado, cantidadVotantes } = this.state
        return (
            <Fragment>
                    {/* <a data-toggle="modal" data-target={`#actualizarBarrio${this.props.id}`} className="config-edit">
                        <i className="fa fa-wrench" />
                    </a> */}
                    <button  
                        ref={this.showCrear} 
                        type="button" 
                        className="btn btn-primary mt-4" 
                        data-toggle="modal" 
                        data-target={`#actualizarBarrio${this.props.id}`}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <a data-controls-modal={`#actualizarBarrio${this.props.id}`} data-backdrop="static" data-keyboard="false" href="#"></a>
                    <div data-backdrop="static" data-keyboard="false" className="modal inmodal" id={`actualizarBarrio${this.props.id}`} tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content animated bounceInRight">
                                <div className="modal-header">
                                    <button  type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                                    <Link target="_blank" to="/mapaAguachica">
                                    </Link>
                                    <a
                                        target="_blank"
                                        href="https://www.google.com/maps/place/Aguachica,+Cesar/@8.309755,-73.6212764,14.5z/data=!4m5!3m4!1s0x8e5d8563dbc2a95b:0x2ec228aa7ae610cc!8m2!3d8.305925!4d-73.611665"
                                    >
                                        <i data-toggle="tooltip" data-placement="bottom" title="Ver mapa de Aguachica" className="fa fa-map-marker animate-map modal-icon" />
                                    </a>
                                    <h4 className="modal-title">Actualizar Barrio</h4>
                                    <small className="font-bold">Completa todos los campos.</small>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <Mutation  mutation={CREAR_BARRIO}>
                                            {(crearBarrio, { data }) => (
                                                    <form
                                                        id={`formCrearBarrio${this.props.id}`}
                                                        onSubmit={e => this.crearBarrio(e, crearBarrio)}
                                                    >
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
                                                    </form>
                                            )}
                                        </Mutation>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <ReactNotification ref={this.notificationDOMRef} />
                                    <button onClick={this.resetState} ref={this.close} type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    <button disabled={this.state.error} form={`formCrearBarrio${this.props.id}`} type="submit" className="btn btn-primary">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>

        )
    }
}
