import React, { Component, Fragment } from 'react'
import Swal from 'sweetalert2'
import { Mutation } from 'react-apollo';
import { CREAR_ZONA } from './../../mutations'

const initialState = {
    nombre: ''
};

export default class ModalFormPrograma extends Component {
    close = React.createRef();
    showCrear = React.createRef();
    state = {
        ...initialState
    }
    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }

    updateState = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    resetState = () => {
        this.setState({
            ...initialState
        })
    }

    handleClose = () => {
        this.close.current.click();
        this.setState({ show: false });
    }
    swalAlert = () => {
        this.handleClose()
        Swal.fire(
            'Creado correctamente!',
            'Presiona el botón para continuar',
            'success'
        )
    }
    nuevoPrograma = (e, crearPrograma) => {
        e.preventDefault();
        crearPrograma().then(data => {
            this.resetState();
            this.swalAlert();
        })
    }
    showModal = () => {
        this.showCrear.current.click();
    }

    render() {
        const { nombre, estado, categoria, encargado } = this.state
        const input = {
            nombre,
            estado,
            categoria,
            encargado
        }
        console.log("asdww",input)
        return (
            <Fragment>
                <div className="col-md-3">
                    <div className="box bg-light" style={{ height: '230px', borderStyle: 'dotted', borderColor: '#ccc' }}>
                        <div onClick={this.showModal} className="icon">
                            <i className="fa fa-plus"></i>
                        </div>
                        <div className="content-card-add">
                            <h2>Agregar programa</h2>
                        </div>
                        <button style={{visibility: "hidden"}} ref={this.showCrear} type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-crear">
                            <i className="fas fa-pen"></i>
                        </button>
                        <div className="modal fade" id="modal-crear">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span></button>
                                        <h4>Crear Programa</h4>
                                        {/* <h4 className="modal-title">Editar Estudiante</h4> */}
                                    </div>
                                    <div className="modal-body" style={{ backgroundColor: '#F1F4F6' }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="box box-success">
                                                    <div className="box-header">
                                                    </div>
                                                    <div className="box-body">
                                                        <Mutation mutation={CREAR_PROGRAMA} variables={ {input} }>
                                                            {(crearPrograma, { data }) => (
                                                                <form
                                                                    id="formEstudiante"
                                                                    onSubmit={e => this.nuevoPrograma(e, crearPrograma)}
                                                                >

                                                                    <div>
                                                                        <div className="form-group col-md-6">
                                                                            <label>Nombre:</label>
                                                                            <input
                                                                                type="text"
                                                                                name="nombre"
                                                                                className="form-control"
                                                                                placeholder="Nombre del estudiante"
                                                                                value={this.state.nombre}
                                                                                onChange={this.updateState}
                                                                            />
                                                                        </div>
                                                                        <div className="form-group col-md-6">
                                                                            <label>Encargado:</label>
                                                                            <input
                                                                                type="text"
                                                                                name="encargado"
                                                                                className="form-control"
                                                                                placeholder="Nombre del encargado"
                                                                                value={this.state.encargado}
                                                                                onChange={this.updateState}
                                                                            />
                                                                        </div>
                                                                        <div className="form-group col-md-12">
                                                                            <label>Categoria:</label>
                                                                            <select
                                                                                name="categoria"
                                                                                className="form-control"
                                                                                onChange={this.updateState}
                                                                                value={this.state.categoria}
                                                                            >
                                                                                <option value="">Elegir...</option>
                                                                                <option value="MASCULINO">MASCULINO</option>
                                                                                <option value="FEMENINA">FEMENINA</option>
                                                                                <option value="GENERAL">GENERAL</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="form-group col-md-12">
                                                                            <label>Estado:</label>
                                                                            <select
                                                                                name="estado"
                                                                                className="form-control"
                                                                                value={this.state.estado}
                                                                                onChange={this.updateState}
                                                                            >
                                                                                <option value="">Elegir...</option>
                                                                                <option value="EJECUCION">EJECUCIÓN</option>
                                                                                <option value="CANCELADO">CANCELADO</option>
                                                                                <option value="RECESO">RECESO</option>

                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                </form>
                                                            )}
                                                        </Mutation>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button ref={this.close} type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                            <button type="submit" form="formEstudiante" className="btn btn-success">Guardar Cambios</button>
                                        </div>
                                    </div>
                                    {/* /.modal-content */}
                                </div>
                                {/* /.modal-dialog */}
                            </div>
                        </div>
                    </div>

                </div>


            </Fragment>
        )
    }
}