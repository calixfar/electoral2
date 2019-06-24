import React, {Fragment} from 'react'
import ReactNotification from "react-notifications-component";
import {Query, Mutation} from 'react-apollo'
import {OBTENER_ZONAS} from './../../queries'

import {TitleContent} from './../layout/TitleContent'
import {WrapperContent} from './../layout/WrapperContent'
import {Spinner} from './../utilidades/Spinner'

import {Zona} from './Zona'
import ModalCrearZona from './ModalCrearZona'

let nombresZonas = [];
const notificationDOMRef = React.createRef();
const btnClick = React.createRef();
let click2 = () => {
    btnClick.current.click()

}
let show = () => console.log('mostar')
let addNotify = (nombre) => {
    console.log('enter')
        notificationDOMRef.current.addNotification({
        title: "Registro Exitoso!",
        message: `Se regitro la zona ${nombre}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
}
let content = () => {
    nombresZonas= []
    return(
        <div className="row">
            <Query query={OBTENER_ZONAS} pollInterval={500}>
                {({loading,error, data,starPolling, stopPolling}) => {
                    if(loading) 
                        return (<Spinner/>)
                    if(error){
                         return (`Error: ${error.message}`)
                    
                    }
                    const dataZona = data.obtenerZonas;
                    dataZona.map(zona => {
                        if(!nombresZonas.includes(zona.nombre)){
                            nombresZonas.push(zona.nombre.toLowerCase().trim())
                        }
                    })
                    return(
                        dataZona.map((zona, i) => {
                            return(
                                <Zona
                                    num={i+1}
                                    data={zona}
                                    key={zona.id}
                                    nombresZonas={nombresZonas}
                                />
                            )
                        })
                    )
                }}
            </Query>
            <ReactNotification ref={notificationDOMRef} />
            <ModalCrearZona notify={addNotify} zonas={nombresZonas}/>
        </div>

    )
}
export const Zonas = () => {
    return(
        <Fragment>
            <TitleContent title="Zonas" subtitle="Ver Zonas" />
            <WrapperContent content={content}/>
        </Fragment>
    )
}