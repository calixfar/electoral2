import React, { Component, Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect,withRouter } from 'react-router-dom'

//layout
import { Menu } from './components/layout/Menu'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import NotFound from './components/layout/NotFound'
//Zonas
import { Zonas } from './components/zonas/Zonas'

//Barrios
import { Barrios } from './components/barrios/Barrios'

//utilidades
import MapaAguachica from './components/utilidades/Mapa'

//Campañas
import Votantes from './components/campañas/votantes'
import Micro from './components/campañas/micro'
import Macro from './components/campañas/macro/Macro'
import { Registro } from './components/campañas/Registro'
import Cumple from './components/cumpleaños/cumple'
import { Perfil } from './components/campañas/perfil/Perfil'
import RegistroUsuario from './components/auth/Registro'
import Login from './components/auth/Login'

//Session

import Session from './components/Session';


//dashboard

import { Dashboard } from './components/dashboard/Dashboard'
import { Zona } from './components/zonas/Zona';

//Reporte

import Reporte from './components/reportes/Reporte'


const App = (props) => {
  const { refetch, session, history } = props;
  const { obtenerUsuario } = session;
  let eventHide = false;
  const fEventHide = () => {
    console.log('entro')
    eventHide = !eventHide
    if(eventHide) document.body.classList.add('mini-navbar')
    else  document.body.classList.remove('mini-navbar')
  }
  //let message = (obtenerUsuario) ? `Welcome ${obtenerUsuario.usuario}` : redireccionar()
  return (
    <Router>
      <Fragment>
        {(obtenerUsuario) ? <Menu user={ obtenerUsuario }/> : ''}
        <div {...(obtenerUsuario) ? '' : {style: {margin: '0px'}}} className="gray-bg" id="page-wrapper">
          <Header   user ={ obtenerUsuario } fEventHide={fEventHide} />
          {/* {message} */}
          <Switch>
            {/* render={() => obtenerUsuario ? <Zonas/> : <Redirect to="login"/>} */}
            <Route exact path="/" render={() => obtenerUsuario ? <Dashboard/> : <Redirect to="/login"/>}  />
            <Route exact path="/zonas" render={() => obtenerUsuario ? <Zonas/> : <Redirect to="/login"/>}  />
            <Route exact path="/mapaAguachica" component={MapaAguachica} />
            <Route exac path="/zona/barrio/:id" render={(props) => obtenerUsuario ? <Barrios {...props}/> : <Redirect to="/login"/>} />
            <Route exact path="/campañas/micro" render={() => obtenerUsuario ? <Micro/> : <Redirect to="/login"/>} />
            <Route exact path="/campañas/macro" render={() => obtenerUsuario ? <Macro/> : <Redirect to="/login"/>} />
            <Route exact path="/campañas/votantes" render={() => obtenerUsuario ? <Votantes/> : <Redirect to="/login"/>} />
            <Route exac path="/campañas/registro" render={() => obtenerUsuario ? <Registro/> : <Redirect to="/login"/>} />
            <Route exac path="/cumpleaños" render={() => obtenerUsuario ? <Cumple/> : <Redirect to="/login"/>} />
            <Route exac path="/perfil/:id/:nombre" render={(props) => obtenerUsuario ? <Perfil {...props }/> : <Redirect to="/login"/>} />
            <Route exac path="/registrar/usuario" render={() => obtenerUsuario ? <RegistroUsuario/> : <Redirect to="/login"/>} />
            <Route exac path="/login" render={() => <Login user={obtenerUsuario} refetch={refetch} />} />
            <Route exact path="/reporte" render={() => (obtenerUsuario) ? <Reporte/> : <Redirect to="/login"/> } />
            <Route component={NotFound}/>
          </Switch>
          <Footer />
        </div>
      </Fragment>
    </Router>
  )
}

const RootSession = Session(App)

export { RootSession };