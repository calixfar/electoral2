import React from 'react'


export const Informacion = (data) => {
    const person = data.data
    console.log(person)
    const cantidadMiembtos = person.lideres.length + person.macros.length + person.multip.length + person.votantes.length
    return (
        <div>
            <div className="d-flex justify-content-center mt-1">
                <img className="circle-border" style={{ width: '35%', height: '35%' }} src="./../../img/avatar.png" ></img>
            </div>
            <div className="ibox-content profile-content">
                <div className="row">
                    <div className="col-md-6">
                        <h4>{person.nombre} {person.apellido}</h4>
                    </div>
                    <div className="col-md-6">
                        <h4><i className="fa fa-user-o"/> Tipo: {person.tipo}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-1">
                        <h4 style={{borderBottom: 'solid 1px #ccc'}} className="text-center">Contacto</h4>
                    </div>
                    <div className="col-md-12">
                        <p className="text-center"><i className="fa fa-envelope"/> {person.correo}</p>
                    </div>
                    <div className="col-md-6">
                        <p><i className="fa fa-phone"/> {person.celular}</p>
                    </div>
                    <div className="col-md-6">
                        <p><i className="fa fa-map-marker"/> {person.direccion}</p>
                    </div>
                    <div className="col-md-12 mt-1">
                        <h4 style={{borderBottom: 'solid 1px #ccc'}} className="text-center">Datos</h4>
                    </div>
                    <div className="col-md-6">
                        <p><i className="fa fa-suitcase"/> {person.ocupacion}</p>
                    </div>
                    <div className="col-md-6">
                        <p><i className="fa fa-graduation-cap"/> {person.perfil}</p>
                    </div>
                    <div className="col-md-12 mt-1">
                        <h4 style={{borderBottom: 'solid 1px #ccc'}} className="text-center">Campaña</h4>
                    </div>
                    <div className="col-md-12">
                        <p className="text-center"><i className="fa fa-users"/> Miembros campaña: {cantidadMiembtos}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="text center"><i className="fa fa-trophy"/> Total votos: {person.totalGeneral.totalPersonas}</p>
                        
                    </div>
                    <div className="col-md-6">
                        <p className="text center"><i className="fa fa-check"/> Fidelizados: {person.totalGeneral.totalFidelizados}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}