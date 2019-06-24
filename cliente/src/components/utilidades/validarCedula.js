import React from 'react'
import {Query} from 'react-apollo'
import {VALIDAR_CEDULA} from './../../queries'

export const validarCedula = (cedula) => {
    let res = true;
    console.log('cedula desde validar', cedula)
    return(
        <Query query={VALIDAR_CEDULA} variables={{cedula}}>
            {({loading, error, data,refetch}) => {
                if(loading) return ''
                if(error) return `Error: ${error.message}`
                refetch()
                console.log('data va',data)
                return (data.validarCedula.length === 0) ?  false :  true
            }}
        </Query>
    )
}