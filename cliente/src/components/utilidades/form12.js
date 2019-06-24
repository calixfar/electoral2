import React from 'react'

export const Form12 = (props) => {
    <div className="col-md-12">
        <div className="ibox">
            <div className="ibox-title">
                <h5>{props.title} </h5>
            </div>
            <div className="ibox-content">
                {props.contentForm}
            </div>
        </div>

    </div>

}