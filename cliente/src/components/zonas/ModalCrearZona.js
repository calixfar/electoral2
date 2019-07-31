import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { CREAR_ZONA } from './../../mutations'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Swal from 'sweetalert2'

const initialSate = {
    nombre: '',
    nombreError: '',
    error: true
}
export default class ModalCrearZona extends Component {
    state = {
        ...initialSate
    }
    showCrear = React.createRef();
    close = React.createRef();
    notificationDOMRef = React.createRef();
    showNotify = React.createRef();
    showAlert = () => {
        Swal.fire(
            `Se registro la zona ${this.state.nombre}!`,
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
            ...initialSate
        })
    }
    spinnerValidation = () => {

    }
    showModal = () => {
        this.showCrear.current.click();
    }
    
    nuevaZona = (e, crearZona) => {
        e.preventDefault();
        const { nombre } = this.state
            const input = {
                nombre
            }
            console.log('inpt',input)
            crearZona({
                variables: {
                    input
                }
            }).then(data => {
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
        const nombreError = (this.state.error) ? <span className="text-danger">{this.state.nombreError}</span> : ''
        return (
            <div className="col-md-3">
                <div className="box2" style={{ height: '392px', backgroundColor: '#fff', overflow: 'hidden' }}>
                    <div className="icon2 mapa" onClick={this.showModal}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div className="content-card-add col-md-12">
                        <h2 className="text-center mt-1" >Agregar Zona</h2>
                    </div>
                    <button style={{ visibility: "hidden" }} ref={this.showCrear} type="button" className="btn btn-primary" data-toggle="modal" data-target="#crearZona">
                        Launch demo modal
                    </button>
                    <a data-controls-modal="crearZona" data-backdrop="static" data-keyboard="false" href="#"></a>
                    <div data-backdrop="static" data-keyboard="false" className="modal inmodal" id="crearZona" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content animated bounceInRight">
                                <div className="modal-header">
                                    <button onClick={this.resetState} type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                                    <Link target="_blank" to="/mapaAguachica">
                                    </Link>
                                    <a
                                        target="_blank"
                                        href="https://www.google.com/maps/place/Aguachica,+Cesar/@8.309755,-73.6212764,14.5z/data=!4m5!3m4!1s0x8e5d8563dbc2a95b:0x2ec228aa7ae610cc!8m2!3d8.305925!4d-73.611665"
                                    >
                                        <i data-toggle="tooltip" data-placement="bottom" title="Ver mapa de Aguachica" className="animate-map fa fa-map-marker modal-icon" />
                                    </a>
                                    <h4 className="modal-title">Agregar Zona</h4>
                                    <small className="font-bold">Cada zona representan un conjunto de barrios o sectores.</small>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Para lograr sectorizar la ciudad de Aguachica</strong> se ha divido la ciudad en zonas donde cada zona
                                    esta compuesta por un conjunto o unión de barrios</p>
                                    <div className="form-group">
                                        <label>Nombre de la zona</label>
                                        <Mutation mutation={CREAR_ZONA}>
                                            {(crearZona, { data }) => (
                                                    <form
                                                        id="formCrearZona"
                                                        onSubmit={e => this.nuevaZona(e, crearZona)}
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
                                    <button disabled={this.state.error} form="formCrearZona" type="submit" className="btn btn-primary">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
