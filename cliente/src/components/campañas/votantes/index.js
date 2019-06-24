import React, { Component, Fragment } from 'react'
import { WrapperContent } from '../../layout/WrapperContent';

export default class Votantes extends Component {
    content = () => {
        return(
            <div className="row">

                <div className="col-md-8">
                    <h1>tabla</h1>
                </div>
                <div className="col-md-4">
                    <h1>Top</h1>
                </div>
            </div>
        )
    }
    render() {
        return (
        <Fragment>
            <WrapperContent content={this.content}>

            </WrapperContent>
        </Fragment>
        )
    }
}
