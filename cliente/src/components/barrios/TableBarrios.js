import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { ELIMINAR_BARRIO } from './../../mutations'
import { PERSONAS_BARRIO,TOTAL_BARRIOS_ZONA } from './../../queries'
import { Spinner } from './../utilidades/Spinner'
import ModalActualizarBarrio from './actualizarBarrio';
import Swal from 'sweetalert2'
export const TableBarrio = (props) => {
    const input = {
        zona: props.zona
    }
    let fillTable = () => {
        return (
            props.barrios.map((barrio, i) => {
                const id = barrio.id
                input.barrio = id
                let color = ''
                if (barrio.estado === 'esta semana') color = 'primary'
                else if (barrio.estado === 'mas de una semana') color = 'warning'
                else color = 'danger'
                return (
                    <tr key={barrio.id}>
                        <td>{i + 1}</td>
                        <td className="project-title">{barrio.nombre}</td>
                        <td className="contact-type">
                            <i className="fa fa-users"></i>
                        </td>
                        <Query query={PERSONAS_BARRIO} variables={{ barrio: id }}>
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if (loading) return 'Cargando...'
                                if (error) return 'Error de red'
                                const { totalPersonasBarrio, totalPersonasFideBarrio } = data.obtenerPersonasBarrio;
                                let porcentaje = Math.round((totalPersonasFideBarrio / barrio.metaVotos) * 100);
                                porcentaje = (isNaN(porcentaje)) ? 0 : porcentaje
                                return (
                                    <div>
                                        <td>
                                            <p style={{ margin: '0px' }}>
                                                <small>Cantidad habitantes: </small>
                                                {barrio.cantidadVotantes}
                                            </p>
                                            <p style={{ margin: '0px' }}>
                                                <small>Meta votos: </small>
                                                {barrio.metaVotos}
                                            </p>
                                            <p style={{ margin: '0px' }}>
                                                <small>Personas registradas: </small>
                                                {totalPersonasBarrio}
                                            </p>
                                        </td>
                                        <td className="project-completion">
                                            <div className="mt-4">
                                                <small>Votos Fidelizados</small>
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: porcentaje }}>
                                                        <small style={{color: 'black'}} >{porcentaje}%</small>
                                                    </div>
                                                </div>
                                                <p className="text-center">
                                                    <small>Total: {totalPersonasFideBarrio}</small>
                                                </p>
                                            </div>
                                        </td>
                                    </div>
                                )
                            }}
                        </Query>
                        <td className="project-completion">
                            <small>Estado visita</small><br></br>
                            <span className={`label label-${color}`}>{barrio.estado}</span>
                        </td>
                        <td className="project-completion p-0">
                            <div style={{margin: '0 auto'}}>
                                <ModalActualizarBarrio className="mt-2" id={id} barrio={barrio} />
                                <Mutation mutation={ELIMINAR_BARRIO}>
                                    {(eliminarBarrio) => (
                                        <button onClick={() => {
                                            Swal.fire({
                                                title: 'Seguro que desea eliminar este barrio?',
                                                text: "No podrás revertir esto !",
                                                type: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Si'
                                            }).then((result) => {
                                                if (result.value) {
                                                    eliminarBarrio({
                                                        variables: { input }
                                                    })
                                                    Swal.fire(
                                                        'Eliminado!',
                                                        'El barrio ha sido eliminado.',
                                                        'success'
                                                    )
                                                }
                                            })
                                        }

                                        }
                                            className="btn btn-danger mt-4 ml-1"
                                        ><i className="fa fa-times"></i> </button>
                                    )}
                                </Mutation>
                            </div>
                        </td>
                    </tr>
                )
            })

        )


    }

    const totalBarrios = () => (
        <Query query={TOTAL_BARRIOS_ZONA} pollInterval={1000}>
            {({loading, error, data, startPolling, stopPolling}) => {
                if(loading) return 'Cargando...'
                if(error) return 'Error de red'
                let message = (data.totalBarrios === 1) ? `${data.totalBarrios} barrio` : `${data.totalBarrios} barrios`
                return (
                    <span className="float-right small text-muted mb-3">{message}</span>
                )
            }}
        </Query>
    )
    return (

        <div className="col-md-12">
            <div className="ibox">
                <div className="ibox-content">
                    <h2>Lista Barrios</h2>
                    <p>Lista de todos los barrios que pertenecen a a zona</p>
                    <div className="input-group">
                        <input type="text" placeholder="Búsqueda personalizada" className="form-control" />
                        <span className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fa fa-search" /> Buscar</button>
                        </span>
                    </div>
                    <div className="client-list mt-3">
                        {totalBarrios()}
                        <div className="project-list table-responsive">
                            <table className="table table-hover table-striped">
                                <tbody>
                                    {fillTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}