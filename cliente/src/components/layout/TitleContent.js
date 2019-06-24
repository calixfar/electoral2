import React from 'react'

export const TitleContent = (props) => {
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
                <h2>{props.title}</h2>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        {props.title}
                    </li>
                    <li className="breadcrumb-item active">
                        <strong>{props.subtitle}</strong>
                    </li>
                </ol>
            </div>
        </div>

    )
}