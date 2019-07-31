import React, { Component, Fragment } from 'react'
import { WrapperContent } from '../layout/WrapperContent';
import { TitleContent } from '../layout/TitleContent';
import { TableBarrio } from './TableBarrios';
import { TopBarrios } from './TopBarrios'
import { Query } from 'react-apollo'
import { OBTENER_ZONA, OBTENER_BARRIOS, PERSONAS_BARRIO } from './../../queries'
import FormBarrio from './FormBarrio';
import { Spinner } from './../utilidades/Spinner'


export class Barrios extends Component {
    
    zona =  this.props.match.params.id
    name = ''
    barrios = {}
    barrioEditar = {
        id: '',
        nombre: '',
        cantidadVotantes: '',
        metaVotos: '',
        estado: '',
    }
    changeReset = true
    reset= () => {
        this.changeReset = false
    }   
    cont = 1
    editarBarrio = (barrio) => {
        this.barrioEditar = {
            ...barrio,
            reset : false
        }
        this.forceUpdate()
    }
    buscarBarrios = () => {
        const input = {
            zona: this.zona
        }
        return (
            <Query pollInterval={500} variables={{ input }} query={OBTENER_BARRIOS}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return <Spinner />
                    if (error) return `Error: ${error.message}`
                    this.barrios = data.obtenerBarrios
                    return (
                        <Fragment>
                            <FormBarrio reset={this.changeReset} editarBarrio={this.barrioEditar} zona={this.zona} barrios={this.barrios} />
                                <div className="row">
                                    <div className="col-md-8">
                                        <TableBarrio reset={this.reset} cont={this.cont} editarBarrio={this.editarBarrio} zona={this.zona} barrios={this.barrios} />
                                    </div>
                                    <div className="col-md-4">
                                        <TopBarrios zona={this.zona} />
                                    </div>
                                </div>
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
    buscarName = () => {
        return (
            <Query query={OBTENER_ZONA} variables={{ id: this.zona }}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return 'Cargando...'
                    if (error) return 'error' + error.message
                    refetch()
                    return (
                        <TitleContent subtitle={'lista'} title={`Barrios de la zona ${data.obtenerZona.nombre}`} />
                    )
                }}
            </Query>
        )
    }
    content = () => {
        return (
            this.buscarBarrios()
        )
    }
    render() {
        console.log(this.props)
        return (
            <Fragment>
                {this.buscarName()}
                <WrapperContent content={this.content} />
            </Fragment>
        )
    }
}