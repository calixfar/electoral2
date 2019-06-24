import React, { Component,Fragment } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//layout
import {Menu} from './components/layout/Menu'
import {Header} from './components/layout/Header'
import {Footer} from './components/layout/Footer'

//Zonas
import {Zonas} from './components/zonas/Zonas'

//Barrios
import {Barrios} from './components/barrios/Barrios'

//utilidades
import MapaAguachica from './components/utilidades/Mapa'

//Campañas
import Votantes from './components/campañas/votantes'
import Micro from './components/campañas/micro'
import Macro from './components/campañas/macro/Macro'
import {Registro} from './components/campañas/Registro'
import Cumple from './components/cumpleaños/cumple'
import {Perfil} from './components/campañas/perfil/Perfil'
import RegistroUsuario from './components/auth/Registro'
import Login from './components/auth/Login' 

//Session

import Session from './components/Session';


//dashboard
 
import {Dashboard} from './components/dashboard/Dashboard'

const App = ({refetch, session}) => {
  console.log(session)
    return(
        <Router>
          <Fragment>
            <Menu/>
            <div className="gray-bg" id="page-wrapper">
              <Header/>
              <Switch>
                {/* <Route exac path="/" component={Dashboard}/> */}
                <Route exact path="/zonas" component={Zonas}/>
                <Route exact path="/mapaAguachica" component={MapaAguachica}/>
                <Route exac path="/zona/barrio/:id" component={Barrios}/>
                <Route exact path="/campañas/micro" component={Micro}/>
                <Route exact path="/campañas/macro" component={Macro}/>
                <Route exact path="/campañas/votantes" component={Votantes}/>
                <Route exac path="/campañas/registro" component={Registro}/>
                <Route exac path="/cumpleaños" component={Cumple}/>
                <Route exac path="/perfil/:id/:nombre" component={Perfil}/>
                <Route exac path="/registrar/usuario" component={RegistroUsuario}/>
                <Route exac path="/login" render = {() => <Login refetch={refetch}/>}/>
              </Switch>
              <Footer/>
            </div>
          </Fragment>
        </Router>
    )
}

const RootSession = Session(App)

export {RootSession};