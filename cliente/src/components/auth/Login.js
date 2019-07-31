import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import { Error } from '../Alertas/Error';

import { Mutation } from 'react-apollo';

import {AUTENTICAR_USUARIO} from './../../mutations'

const initialState = {
    usuario : '',
    password: '',
    mensaje: false
}
class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
        const { name, value} = e.target;
        this.setState({
            [name] : value
        })
     }
     componentWillMount(){
     }

    limpiarState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();
        console.log('login')
        usuarioAutenticar().then(async ({data}) => {
            localStorage.setItem('token', data.autenticarUsuario.token);
            this.setState({mensaje: true, usuario: '', password: ''})
            await this.props.refetch();
            //this.limpiarState();
            //redireccionar
             setTimeout(() => {
                 this.props.history.push('/campañas/macro');
             }, 1000)
           // this.props.history.push
        })
     
     }

     validarForm = () => {
        const {usuario, password} = this.state;

        const noValido = !usuario || !password;

        console.log(noValido);
        return noValido;
     }

    render() { 

        const {usuario, password, mensaje} = this.state;
        const alert = (mensaje) ? 
        <p className="alert alert-success"> 
            <i style={{fontSize: '16px'}} className="fa fa-check-circle-o"></i> 
            &nbsp;&nbsp;Autenticación de usuario exitosa</p> : '' 
        if(!this.props.user){

            return ( 
                <Fragment>
                    <div className="ibox mt-5">
                        <div className="ibox-content">
                            <h1 className="text-center mb-5">Inicio de Sesión</h1>
    
                            <div className="row  justify-content-center">
                                {/* {alert} */}
                                
                                <Mutation 
                                    mutation={ AUTENTICAR_USUARIO }
                                    variables={{usuario, password}}    
                                >
                                {( usuarioAutenticar, {loading, error, data}) => {
    
                                    return (
                                        
                                        <form 
                                            onSubmit={ e => {
                                                console.log('submit')
                                                this.iniciarSesion(e, usuarioAutenticar)} } 
                                            className="col-md-8"
                                        >
                                        {alert}
                                        {error && <Error error={error.message} />}
                                        
    
                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input 
                                                onChange={this.actualizarState} 
                                                value={usuario}
                                                type="text" 
                                                name="usuario" 
                                                className="form-control" 
                                                placeholder="Nombre Usuario" 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input 
                                                onChange={this.actualizarState} 
                                                value={password}
                                                type="password" 
                                                name="password" 
                                                className="form-control" 
                                                placeholder="Password"
                                            />
                                        </div>
    
                                        <button 
                                            disabled={ (usuario !== '' && password !== '') ? false : true  }
                                            type="submit" 
                                            className="btn btn-success float-right">
                                                Iniciar Sesión
                                        </button>
                                        
                                    </form>
                                    )     
                                }}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
        else {
            return (
                <h1 className="text-center">Ya estás logueado</h1>
            )
        }
    }
}
 
export default withRouter(Login);