import React from 'react'
import Swal from 'sweetalert2'
import {Mutation} from 'react-apollo'
import {ELIMINAR_ZONA} from './../../mutations'
import ModalActualizarZona from './modalActualizarZona'
import {Link} from 'react-router-dom'

export const Zona = (props) => {
    const zona = props.data
    let array = props.nombresZonas.filter(item => zona.nombre.toLowerCase() !== item ) 
    const {id} = zona
    return (
        <div className="col-md-3">
            <div className="ibox">
                <div class="ibox-tools mr-3">
                    <div>
                        <ModalActualizarZona id={zona.id} zona={zona} zonas={array}/>
                    </div>

                </div>
                <div className="ibox-content product-box">
                    <div className="product-imitation">
                        <h1 className="text-success">{zona.nombre}</h1>
                    </div>
                    <div className="product-desc">
                        <span className="product-price">
                            {props.num}
                        </span>
                        <small className="text-muted">Resumen</small>
                        <a href="#" className="product-name"> Barrios</a>
                        <div className="small m-t-xs">
                            Ver listado de barrios de esta zona
                        </div>
                        <div className="m-t text-righ">
                            <Link to={`/zona/barrio/${id}`} className="btn btn-xs btn-outline btn-primary">Ver <i className="fa fa-long-arrow-right" /> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}