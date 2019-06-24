import React, { Component, Fragment } from 'react'
import { WrapperContent } from '../layout/WrapperContent';
import { TitleContent } from '../layout/TitleContent';
import { CREAR_USUARIO } from './../../mutations'
import { Mutation } from 'react-apollo'
import {withRouter} from 'react-router-dom'

const initialState = {
    usuario: '',
    password: '',
    repetirPassword: ''
}
class RegistroUsuario extends Component {
    state = {
        ...initialState
    }

    updateState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    validarForm = () => {
        const { usuario, password, repetirPassword } = this.state;
        const noValido = !usuario || !password || password !== repetirPassword;
        return noValido;
    }
    nuevoUsuario = (e,crearUsuario) => {
        e.preventDefault();
        crearUsuario().then(data => {
            this.setState({
                ...initialState
            })
            this.props.history.push('/login')
        })
    }
    content = () => {
        function Error(error){
            return(
                <p className="alert alert-danger text-center- p-2 mb-2">{error.error}</p>
            )
        }
        function Succes(message){
            return(
                <p className="alert alert-primary text-center- p-2 mb-2">{message.message}</p>
            )
        }
        const { usuario, password, repetirPassword } = this.state;
        return (
            <div className="ibox">
                <div className="ibox-title">
                    <h4>Crear Usuario</h4>
                </div>
                <div className="ibox-content">
                    <div className="row  justify-content-center">
                        <Mutation
                            mutation={CREAR_USUARIO}
                            variables={{ usuario, password }}
                        >
                            {(crearUsuario, { loading, error, data }) => {
                                return (
                                    <form
                                        className="col-md-8"
                                        onSubmit={e => this.nuevoUsuario(e, crearUsuario) }
                                    >
                                        {error && <Error error="El usuario ya esiste"/>}
                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input
                                                value={usuario}
                                                onChange={e => this.updateState(e)}
                                                type="text"
                                                name="usuario"
                                                className="form-control"
                                                placeholder="Nombre Usuario"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                value={password}
                                                onChange={e => this.updateState(e)}
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Repetir Password</label>
                                            <input
                                                value={repetirPassword}
                                                onChange={e => this.updateState(e)}
                                                type="password"
                                                name="repetirPassword"
                                                className="form-control"
                                                placeholder="Repetir Password"
                                            />
                                        </div>

                                        <button
                                            disabled={loading || this.validarForm()}
                                            type="submit"
                                            className="btn btn-primary float-right">
                                            Crear Usuario
                                </button>
                                    </form>
                                )
                            }}

                        </Mutation>
                    </div>

                </div>
            </div>
        )
    }
    render() {
        return (
            <Fragment>
                <TitleContent title="Registrar Usuario" subtitle="registrar" />
                <WrapperContent content={this.content} />
            </Fragment>
        )
    }
}
export default withRouter(RegistroUsuario)