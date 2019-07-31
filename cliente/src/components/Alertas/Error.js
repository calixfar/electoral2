import React from 'react'


export const Error = (message) => {
    console.log('asd',message)
    return(
        <p style={{color: "color:#222222"}} className="alert alert-danger alert-dismissible">{message.error}</p>
    )
}