import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Spinner } from '../utilidades/Spinner';
import { OBTENER_PERSONAS_CUMPLE } from './../../queries'
import {ENVIAR_SMS} from './../../mutations'
import { WrapperContent } from '../layout/WrapperContent';
import { TitleContent } from '../layout/TitleContent';
import Swal from 'sweetalert2'

export default class Cumple extends Component {

    centerBlockTd = (smallText, icono, textContent) => (
        <div className="row">
            
        </div>
    )
    efectIcon = (content, classIcon) => (
        <div className="row">
            <div className="col-md-12 text-center">
                <i className={`fa ${classIcon}`}></i>
            </div>
            <div className="col-md-12 text-center">
                {content}
            </div>
        </div>
    )
    showAlert = () => {
        Swal.fire(
            `El mensaje fue enviado correctamente!`,
            'Click para continuar!',
            'success'
          )
    }
    tBodyTable = (data) => {
        if(data.length > 0){
            return (
                <tbody>
                    {data.map((person,i) => {
                        return(
                            <tr key={i}>
                                <td><img style={{ width: '20px', height: '20px' }} src="./../../img/avatar.png" /></td>
                                <td>
                                    <small>Nombre</small><br></br>
                                    {person.nombre} {person.apellido}
                                </td>
                                <td>{this.efectIcon(person.celular, 'fa-phone')}</td>
                                <td>
                                    {this.efectIcon(`Edad que cumple: ${person.edad}`, 'fa-birthday-cake text-info')}
                                    {/* <small>Edad que cumple</small><br></br>
                                    <i className="fa fa-birthday-cake text-info"></i>  {person.edad} */}
                                </td>
                                <td>
                                    <Mutation 
                                        mutation={ENVIAR_SMS} 
                                        variables={{
                                            input:{
                                                id: person.id,
                                                nombre: `${person.nombre} ${person.apellido}`,
                                                to: person.celular,
                                                edad: person.edad
                                        }}}
                                    >
                                        {enviarSMS => (
                                            <button 
                                                title="Enviar SMS de cumpleaños" 
                                                className="btn btn-primary"
                                                onClick={ () => {
                                                    enviarSMS().then(response => {
                                                        this.showAlert()
                                                    })
                                                }}
                                            >
                                                <i className="fa fa-envelope"></i>
                                            </button>
                                        )}
                                        
                                    </Mutation>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            )
        } else {
            return(
                <tbody>
                    <h1 className="text-center">No hay personas que estén cumpliendo años hoy o ya se enviaron todos los mensajes</h1>
                </tbody>
            )
        }

    }
    fillTableCumple = () => {
        return (
            <Fragment>
                <div className="row">
                    <div className="ibox col-md-12">
                        <div className="ibox-title">
                            <h5>Personas que cumplen años hoy</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="project-list">
                                <table className="table table-hover">
                                    <Query pollInterval={600} query={OBTENER_PERSONAS_CUMPLE}>
                                        {({ loading, error, data, startPolling, stopPolling }) => {
                                            if (loading) return <Spinner />
                                            if (error) return ('Error: ' + error.message)
                                            return (
                                                this.tBodyTable(data.obtenerPersonasCumple)
                                            )
                                        }}
                                    </Query>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </Fragment>
        )
    }
    content = () => {
        return (
            this.fillTableCumple()
        )
    }
    render() {
        return (
            <Fragment>
                <TitleContent subtitle="lista" title="Lista Cumpleaños"></TitleContent>
                <WrapperContent content={this.content}></WrapperContent>
            </Fragment>
        )
    }
}