import React from 'react'

export const WrapperContent = (props) => {
    return(
        <div className="wrapper wrapper-content animated fadeInRight">
            {props.content()}
        </div>
    )
}