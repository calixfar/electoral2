import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ACTUALIZAR_ZONA } from './../../mutations'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Swal from 'sweetalert2'

const initialSate = {
    nombre: '',
    nombreError: '',
    error: true
}
export default class ModalActualizarPrograma extends Component {
    state = {
        ...this.props.zona,
        error: true
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
    addNotification = () => {
        this.notificationDOMRef.current.addNotification({
          title: "Registro Exitoso!",
          message: `Se regitro la zona ${this.state.nombre}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }
    resetState = () => {
        this.setState({
            ...this.props.zona
        })
    }
    spinnerValidation = () => {

    }
    showModal = () => {
        this.showCrear.current.click();
    }
    
    updateZona = (e,actualizarZona) => {
        e.preventDefault();
        
            actualizarZona().then(data => {
                this.close.current.click()
                this.showAlert()
                this.resetState()
            })
        
    }
    updateState = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
            error: (value !== '') ? false : true,
            nombreError: 'El campo no puede estar vacío'
        })
    }
    
    setError = () => {
        if(this.state.nombre === ''){
            this.setState({
                error: true,
                nombreError: 'El campo no puede estar vacío'
            })
        }
        else if(this.props.zonas.includes(this.state.nombre.toLocaleLowerCase().trim())){
            this.setState({
                error: true,
                nombreError: 'Este nombre ya ha sido asignado a una zona'
            })
        }
        else{
            this.setState({
                error: false,
                nombreError: ''
            })
        }
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
        const { nombre } = this.state
        const {id} = this.props
        const input = {
            nombre,
            id
        }
        console.log(input)
        const nombreError = (this.state.error) ? <span className="text-danger">{this.state.nombreError}</span> : ''
        return (
            <Fragment>
                    <a data-toggle="modal" data-target={`#actualizarZona${this.props.id}`} className="config-edit">
                        <i className="fa fa-wrench" />
                    </a>
                    {/* <button style={{ visibility: "hidden" }} ref={this.showCrear} type="button" className="btn btn-primary" data-toggle="modal" data-target="#crearZona">
                        Launch demo modal
                    </button> */}
                    <a data-controls-modal={`actualizarZona${this.props.id}`} data-backdrop="static" data-keyboard="false" href="#"></a>
                    <div data-backdrop="static" data-keyboard="false" className="modal inmodal" id={`actualizarZona${this.props.id}`} tabIndex={-1} role="dialog" aria-hidden="true">
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
                                    <h4 className="modal-title">Actualizar Zona</h4>
                                    <small className="font-bold">Cada zona representan un conjunto de barrios o sectores.</small>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Nombre de la zona</label>
                                        <Mutation variables={{input}} mutation={ACTUALIZAR_ZONA}>
                                            {(actualizarZona, { data }) => (
                                                    <form
                                                        id={`formCrearZona${this.props.id}`}
                                                        onSubmit={e => this.updateZona(e, actualizarZona)}
                                                    >
                                                        <input value={this.state.nombre} onBlur={this.setError} name="nombre" onChange={this.updateState} type="text" placeholder="Ingrese el nombre de la zona" className="form-control" />
                                                        {nombreError}
                                                    </form>
                                            )}
                                        </Mutation>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <ReactNotification ref={this.notificationDOMRef} />
                                    <button onClick={this.resetState} ref={this.close} type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    <button disabled={this.state.error} form={`formCrearZona${this.props.id}`} type="submit" className="btn btn-primary">Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>

        )
    }
}
