import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { OBTENER_PERSONA } from './../../../queries';
import { WrapperContent } from '../../layout/WrapperContent';
import { TitleContent } from '../../layout/TitleContent';
import { Spinner } from '../../utilidades/Spinner';
import FormEditPerfil from './FormEditPerfil'
import {Informacion} from './Informacion'

export const Perfil = (props) => {

    const content = () => {
        const { id } = props.match.params
        console.log(id)
        return (
            <Fragment>
                    <Query query={OBTENER_PERSONA} variables={{ id }}>
                        {({ loading, error, data }) => {
                            if (loading) return <Spinner />
                            if (error) return `Error: ${error.message}`
                            console.log(data)
                            const fechaCumple = new Date(Number(data.obtenerPersona.fechaCumple))
                            const dia = fechaCumple.getDate()
                            const mes = fechaCumple.getMonth() < 10 ? `0${fechaCumple.getMonth()}` : fechaCumple.getMonth()
                            const año = fechaCumple.getFullYear()
                            
                            data.obtenerPersona.fechaCumple = `${año}-${mes}-${dia}`;
                            console.log(dia,mes,año)
                            console.log(data.obtenerPersona.fechaCumple, 'fecha')
                            return (
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="ibox">
                                                <div className="ibox-title">
                                                    <h5>Informarción básica</h5>
                                                </div>
                                            <div>
                                                <div className="ibox-content no-padding border-left-right">
                                                    <Informacion data={data.obtenerPersona}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="ibox">
                                            <div className="ibox-title">
                                                <h5>Nombre</h5>
                                            </div>
                                            <div className="ibox-content">
                                                <FormEditPerfil data={data.obtenerPersona} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </Query>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <TitleContent title={`Perfil de ${props.match.params.nombre}`} subtitle="editar perfil" />
            <WrapperContent content={content} />
        </Fragment>
    )

}

