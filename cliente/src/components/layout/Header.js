import React, {Fragment} from 'react'
import CerrarSesion from './CerrarSesion'
export const Header = (props) => {
    const nav = (props.user) ? <NavegacionAutenticado fEventHide={props.fEventHide} user={props.user}/> : <NavegacionNoAutenticado/>
    return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top white-bg" role="navigation" style={{ marginBottom: 0 }}>
                {nav}
            </nav>
        </div>

    )
}

const NavegacionAutenticado = (props) => (
    <Fragment>
        <div className="navbar-header">
            <span onClick={props.fEventHide} className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars" /> </span>
        </div>
        <ul className="nav navbar-top-links navbar-right">
            <li>
                <span className="m-r-sm text-muted welcome-message">Nombre Usuario: {props.user.nombre}</span>
                <span className="m-r-sm text-muted welcome-message">Tipo: {props.user.rol}</span>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <i className="fa fa-envelope" />  <span className="label label-warning">16</span>
                </a>
                <ul className="dropdown-menu dropdown-messages">
                    <li>
                        <div className="dropdown-messages-box">
                            <a className="dropdown-item float-left" href="profile.html">
                                <img alt="image" className="rounded-circle" src="img/a7.jpg" />
                            </a>
                            <div>
                                <small className="float-right">46h ago</small>
                                <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br />
                                <small className="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <div className="dropdown-messages-box">
                            <a className="dropdown-item float-left" href="profile.html">
                                <img alt="image" className="rounded-circle" src="img/a4.jpg" />
                            </a>
                            <div>
                                <small className="float-right text-navy">5h ago</small>
                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br />
                                <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <div className="dropdown-messages-box">
                            <a className="dropdown-item float-left" href="profile.html">
                                <img alt="image" className="rounded-circle" src="img/profile.jpg" />
                            </a>
                            <div>
                                <small className="float-right">23h ago</small>
                                <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br />
                                <small className="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <div className="text-center link-block">
                            <a href="mailbox.html" className="dropdown-item">
                                <i className="fa fa-envelope" /> <strong>Read All Messages</strong>
                            </a>
                        </div>
                    </li>
                </ul>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <i className="fa fa-bell" />  <span className="label label-primary">8</span>
                </a>
                <ul className="dropdown-menu dropdown-alerts">
                    <li>
                        <a href="mailbox.html" className="dropdown-item">
                            <div>
                                <i className="fa fa-envelope fa-fw" /> You have 16 messages
                <span className="float-right text-muted small">4 minutes ago</span>
                            </div>
                        </a>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <a href="profile.html" className="dropdown-item">
                            <div>
                                <i className="fa fa-twitter fa-fw" /> 3 New Followers
                <span className="float-right text-muted small">12 minutes ago</span>
                            </div>
                        </a>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <a href="grid_options.html" className="dropdown-item">
                            <div>
                                <i className="fa fa-upload fa-fw" /> Server Rebooted
                <span className="float-right text-muted small">4 minutes ago</span>
                            </div>
                        </a>
                    </li>
                    <li className="dropdown-divider" />
                    <li>
                        <div className="text-center link-block">
                            <a href="notifications.html" className="dropdown-item">
                                <strong>See All Alerts</strong>
                                <i className="fa fa-angle-right" />
                            </a>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <CerrarSesion/>
            </li>
        </ul>
    </Fragment>
)

const NavegacionNoAutenticado = () => (
    <h3 style={{width: '100%'}} className="text-center p-3"><i className="fa fa-desktop"/> App Campaña Electoral</h3>
)