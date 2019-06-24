import React, {Fragment} from 'react'
import { TitleContent } from '../layout/TitleContent';
import { WrapperContent } from '../layout/WrapperContent';


const topGeneral = () => {
    return(
        <div className="col-md-6">
            <div className="ibox">
                <div className="ibox-title">
                    <h5>Top campañas</h5>
                </div>
                <div className="ibox-content">

                </div>      
            </div>
        </div>
    )
}
const content = () => {
    return(
        <div className="row">
            {topGeneral()}
        </div>
    )
}
export const Dashboard = () => {
    return(
        <Fragment>
            <TitleContent title="Dashboard" subtitle="dashboard"/>
            <WrapperContent content={content}/>
        </Fragment>
    )
}