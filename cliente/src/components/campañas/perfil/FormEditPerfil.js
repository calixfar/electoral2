import React, { Component } from 'react'
import {Mutation, Query} from 'react-apollo'
import { CREAR_PERSONA, ACTUALIZAR_PERSONA } from './../../../mutations'
import { OBTENER_BARRIOS, OBTENER_PERSONAS_CAMPAÑA } from './../../../queries'
import Select from 'react-select'

export default class FormEditPerfil extends Component {
    state = {
        ...this.props.data,
        submit: false
    }
    updateState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    updateBarrio = (dato) => this.setState({ barrio: (dato ? dato.id : ''), valueBarrio: dato })
    updatePersona = (e, actualizarPersona) => {
        e.preventDefault();
        const { id, nombre, dinero, genero, apellido, fechaCumple, estadoCivil, ocupacion, perfil
            , cedula, celular, direccion, correo, tipo, barrio, lugarVotacion, mesaVotacion, metaVotos, estadoContacto,
            fidelizado } = this.state
        const input = {
            id, nombre, apellido, fechaCumple, estadoCivil, ocupacion, perfil
            , cedula, dinero, genero, celular, direccion, correo, tipo, barrio, lugarVotacion, mesaVotacion: Number(mesaVotacion), metaVotos: Number(metaVotos), estadoContacto,
            fidelizado: (/true/i).test(fidelizado)
        }
        const variables = { input }
        actualizarPersona({ variables }).then(data => {
            this.setState({submit: true})
            setTimeout(() => this.setState({submit: false}), 1500)
        })
    }
    updateRadioButton = (e) => {
        const { name, value } = e.target
        this.setState({
            superior: {},
            [name]: value
        })
    }
    arrayOpcionesTiposCampaña = ['votante', 'multiplicador', 'lider', 'macro', 'ninguna'];
    tiposCampaña = (name, update, pos) => {
        return (
            this.arrayOpcionesTiposCampaña.map((tipo, i) => {
                if (i >= pos) {
                    if (pos === 0) {
                        if (i < this.arrayOpcionesTiposCampaña.length - 1) {
                            return (
                                <div key={i} className={`col-md-3`}>
                                    <label style={{ fontSize: '14px', fontWeight: '500' }}>
                                        <input
                                            style={{ position: 'relative', top: '3px' }}
                                            type="radio"
                                            checked={this.state.tipo === tipo ? true : false}
                                            required 
                                            name={name}
                                            onClick={e => update(e)}
                                            value={tipo}
                                        /> &nbsp;{tipo}
                                    </label>
                                </div>
                            )
                        }
                    }
                    else {
                        return (
                            <div key={i} className={`col-md-2`}>
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>
                                    <input
                                        style={{ position: 'relative', top: '3px' }}
                                        type="radio"
                                        checked = {this.state.tipoSuperior === this.arrayOpcionesTiposCampaña[i] ? true : false} 
                                        required
                                        name={name}
                                        onClick={e => update(e)}
                                        value={tipo}
                                    /> &nbsp;{tipo}
                                </label>
                            </div>
                        )
                    }
                }
            })
        )
    }
    render() {
        let changeFidelizado = ''
        let changeBgFidelizado = ''
        if (this.state.fidelizado === 'false') {
            changeFidelizado = 'fa-thumbs-o-down'
            changeBgFidelizado = 'bg-danger'
        } else if (this.state.fidelizado === 'true') {
            changeFidelizado = 'fa-thumbs-o-up'
            changeBgFidelizado = 'bg-primary'
        }
        const messageSuccess = (this.state.submit) ? <div className="col-md-10">
            <p className="alert alert-success text-center" style={{margin: '0 auto'}}> 
                <i style={{fontSize: '16px'}} className="fa fa-check-circle-o"></i> 
            &nbsp;&nbsp;{this.state.nombre} actualizado con éxito</p>
        </div> : ''
        return (
            <div className="panel-body">
                <h5>Campos con * son obligatorios</h5>
                <div className="row">
                    <Mutation mutation={ACTUALIZAR_PERSONA}>
                        {actualizarPersona => (
                            <form
                                className="col-md-12 d-flex"
                                onSubmit={e => this.updatePersona(e, actualizarPersona)}
                                ref={this.formRef}
                            >
                                <div className="row">
                                    {messageSuccess}
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Cedúla</label>
                                            <input
                                                required
                                                className="form-control"
                                                name="cedula"
                                                placeholder="Digite la cedúla"
                                                type="number"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.cedula}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Nombre</label>
                                            <input
                                                required
                                                className="form-control"
                                                name="nombre"
                                                placeholder="Digite el nombre"
                                                type="text"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.nombre}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Apellidos</label>
                                            <input
                                                required
                                                className="form-control"
                                                name="apellido"
                                                placeholder="Digite el apellido"
                                                type="text"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.apellido}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Fecha</label>
                                            <div className="input-group date">
                                                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                                <input
                                                    required
                                                    className="form-control"
                                                    name="fechaCumple"
                                                    type="date"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.fechaCumple}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Género</label>
                                            <select
                                                className="form-control"
                                                name="genero"
                                                required
                                                type="select"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.genero}
                                            >
                                                <option value="">Elegir...</option>
                                                <option value="MASCULINO">Masculino</option>
                                                <option value="FEMENINO">Femenino</option>
                                                <option value="OTRO">Otro</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Estado Civil</label>
                                            <select
                                                className="form-control"
                                                name="estadoCivil"
                                                type="select"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.estadoCivil}
                                            >
                                                <option value="">Elegir...</option>
                                                <option value="CASADO">Casado</option>
                                                <option value="SOLTERO">Soltero</option>
                                                <option value="UNION">Union</option>
                                                <option value="DIVORCIADO">Divorciado</option>
                                                <option value="VIUDO">Viudo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Perfil</label>
                                            <select
                                                className="form-control"
                                                name="perfil"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.perfil}
                                            >
                                                <option value="">Elige una opción</option>
                                                <option value="admon">Administración de Empresas</option>
                                                <option value="contaduria">Contaduría</option>
                                                <option value="Economía">Economía</option>
                                                <option value="psicología">Psicología</option>
                                                <option value="derecho">Derecho</option>
                                                <option value="medicina">Medicina</option>
                                                <option value="enfermeria">Enfermeria</option>
                                                <option value="ingmecanica">Ing Mecanica</option>
                                                <option value="ingcivil">Ing Civil</option>
                                                <option value="ingsistemas">Ing Sistemas</option>
                                                <option value="ingambiental">Ing Ambiental</option>
                                                <option value="ingagro">Ing Agro</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Ocupación</label>
                                            <input
                                                className="form-control"
                                                name="ocupacion"
                                                placeholder="Digite la ocupación"
                                                type="text"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.ocupacion}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Celular</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                                <input
                                                    required
                                                    className="form-control"
                                                    name="celular"
                                                    type="number"
                                                    placeholder="Número de contacto"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.celular}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Dirección</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-home"></i></span>
                                                <input
                                                    className="form-control"
                                                    name="direccion"
                                                    type="text"
                                                    placeholder="Digite la dirección"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.direccion}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Correo</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-address-card-o"></i></span>
                                                <input
                                                    className="form-control"
                                                    name="correo"
                                                    type="email"
                                                    placeholder="Digite el correo"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.correo}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Barrio</label>
                                            <Query query={OBTENER_BARRIOS}>
                                                {({ loading, error, data, refetch }) => {
                                                    if (loading) return 'Cargando...'
                                                    if (error) return ('Error: ' + error.message)

                                                    return (
                                                        // <Select
                                                        //     onFocus={() => refetch()}
                                                        //     onChange={this.updateBarrio}
                                                        //     name="barrio"
                                                        //     options={data.obtenerBarrios}
                                                        //     getOptionValue={(options) => options.id}
                                                        //     getOptionLabel={(options) => options.nombre}
                                                        //     value={this.state.valueBarrio}
                                                        // />
                                                        <select name="barrio" value={this.state.barrio} className="form-control" onChange={this.updateState}>
                                                            {data.obtenerBarrios.map(barrio => {
                                                                return(
                                                                    <option value={barrio.id}>{barrio.nombre}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Último Contacto</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-comments"></i></span>
                                                <select
                                                    required
                                                    className="form-control"
                                                    name="estadoContacto"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.estadoContacto}
                                                >
                                                    <option value="">Elegir...</option>
                                                    <option value="SEMANA">Esta semana</option>
                                                    <option value="MASSEMANA">Más de una semana</option>
                                                    <option value="MES">Más de un mes</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Lugar votación</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-inbox"></i></span>
                                                <input
                                                    required
                                                    className="form-control"
                                                    name="lugarVotacion"
                                                    type="text"
                                                    placeholder="Digite el lugar"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.lugarVotacion}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Mesa de votación</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-inbox"></i></span>
                                                <input
                                                    required
                                                    className="form-control"
                                                    name="mesaVotacion"
                                                    type="number"
                                                    placeholder="Digite la mesa"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.mesaVotacion}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* Meta de votos</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-plus-square-o"></i></span>
                                                <input
                                                    required
                                                    className="form-control"
                                                    name="metaVotos"
                                                    type="number"
                                                    placeholder="Digite la meta"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.metaVotos}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">Dinero Suministrado</label>
                                            <input
                                                required
                                                className="form-control"
                                                name="dinero"
                                                placeholder="Digite el monto"
                                                type="number"
                                                onChange={e => this.updateState(e)}
                                                value={this.state.dinero}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label">* ¿Fidelizado?</label>
                                            <div className="input-group">
                                                <span className={`input-group-addon ${changeBgFidelizado}`}><i className={`fa ${changeFidelizado}`}></i></span>
                                                <select
                                                    required
                                                    className="form-control"
                                                    name="fidelizado"
                                                    onChange={e => this.updateState(e)}
                                                    value={this.state.fidelizado}
                                                >
                                                    <option value="">Elegir...</option>
                                                    <option value={true}>Sí</option>
                                                    <option value={false}>No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Tipo de persona</label>
                                            <div className="row">
                                                {this.tiposCampaña('tipo', this.updateState, 0)}
                                            </div>
                                        </div>

                                    </div> */}
                                    {/* <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="col-form-label">
                                                ¿Pertenece a alguno de los siguientes tipos de campaña?
                                            </label>
                                            <div className="row">
                                                {this.tiposCampaña('tipoSuperior', this.updateRadioButton, 1)}
                                                <div className={`col-md-4 p-0 animated ${animateCampaña}`} style={{ visibility: personaCampaña }}>
                                                    <div className="row">

                                                        <div className="col-md-2">
                                                            <label>
                                                                * ¿A quien?
                                                            </label>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <Query variables={{ input: { tipo: this.state.tipoSuperior } }} query={OBTENER_PERSONAS_CAMPAÑA}>
                                                                {({ loading, error, data, refetch }) => {
                                                                    if (loading) return 'Cargando...';
                                                                    if (error) return `Error: ${error.message}`
                                                                    let array = [];
                                                                    console.log(data)
                                                                    data.obtenerPersonas.map(personas => array.push({
                                                                        id: personas.id,
                                                                        nombre: `${personas.nombre} ${personas.apellido}`,
                                                                        tipo: personas.tipo
                                                                    }))
                                                                    console.log(array)
                                                                    return (
                                                                        <Select
                                                                            onFocus={() => {
                                                                                if (this.state.tipoSuperior !== 'ninguna') refetch()
                                                                            }}
                                                                            ref={this.selectPersona}
                                                                            value={this.state.superior}
                                                                            required
                                                                            onChange={this.updateSuperior}
                                                                            name="superior"
                                                                            options={array}
                                                                            getOptionValue={(array) => array.id}
                                                                            getOptionLabel={(array) => array.nombre}
                                                                        />
                                                                    )
                                                                }}
                                                            </Query>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-md-12 text-center">
                                        <button type="submit" style={{ margin: '0 auto' }} className="btn btn-primary btn-block mt-2">
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Mutation>

                </div>
            </div>
        )
    }
}