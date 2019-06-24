import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { ELIMINAR_BARRIO } from './../../mutations'
import { Spinner } from './../utilidades/Spinner'
import ModalActualizarBarrio from './actualizarBarrio';
import Swal from 'sweetalert2'
export const TableBarrio = (props) => {
    const input = {
        zona: props.zona
    }
    let fillTable = () => {
        return(
            props.barrios.map((barrio, i) => {
                const id = barrio.id
                input.barrio = id
                let color= ''
                if(barrio.estado ===  'esta semana')  color = 'primary'
                else if(barrio.estado ===  'mas de una semana') color= 'warning'
                else color = 'danger'
                return (
                    <tr key={barrio.id}>
                        <td>{i+1}</td>
                        <td className="project-title">{barrio.nombre}</td>
                        <td className="contact-type">
                            <i className="fa fa-users"></i>
                        </td>
                        <td>
                            <small>Cantidad votantes</small> 
                            {barrio.cantidadVotantes}
                        </td>
                        <td className="project-completion">
                            <small>Votos Fidelizados</small>
                            <div className="progress progress-mini">
                                <div className="progress-bar" style={{width: '50%'}}>

                                </div>
                            </div>
                        </td>
                        <td className="project-completion">
                            <small>Estado de visita</small><br></br>
                            <span className={`label label-${color}`}>{barrio.estado}</span>
                        </td>
                        <td className="project-completion p-0 d-flex justify-content-center">
                                <ModalActualizarBarrio className="mt-2" id={id} barrio={barrio}/>
                                <Mutation mutation={ELIMINAR_BARRIO}>
                                    {(eliminarBarrio) => (
                                        <button onClick={ () => {
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
                                                            variables : {input}
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
                        </td>
                    </tr>
                )
            })
                
        )
        
        
    }
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
                        <span className="float-right small text-muted mb-3">100 registros</span>
                        <div className="project-list">
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