import React from 'react'

export const TablaVotantes = (props) => {
    return(
        <div className="col-md-12">
            <div className="ibox">
                <div className="ibox-content">
                    <h2>{props.title}</h2>
                    <p>{props.descripcion}</p>
                    <div className="input-group">
                        <input type="text" placeholder="Búsqueda personalizada" className="form-control" />
                        <span className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fa fa-search" /> Buscar</button>
                        </span>
                    </div>
                    <div className="client-list mt-3">
                        <span className="float-right small text-muted mb-3">{`${props.total} registros`}</span>
                        <div className="project-list">
                            <table className="table table-hover table-striped">
                                <tbody>
                                    {props.fillTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}