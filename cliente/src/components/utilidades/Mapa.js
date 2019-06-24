import Iframe from 'react-iframe'
import {TitleContent} from './../layout/TitleContent'
import {WrapperContent} from './../layout/WrapperContent'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import React, { Component,Fragment } from 'react'

 class MapaAguachica extends Component {
    content = () => {
        return(
            <Map  
                google={this.props.google} zoom={14}
                initialCenter={{
                    lat: 8.3084402,
                    lng: -73.6166
                }}
                >
     
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
     
            <InfoWindow onClose={this.onInfoWindowClose}>
            </InfoWindow>
          </Map>
        )
    }
    render() {
        return (
            <Fragment>
                <TitleContent title="Mapa Aguachica" subtitle="Mapa Aguachica" />
                <WrapperContent  content={this.content}/>
            </Fragment>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyCG9V2DqrPqJTE7bfDZLFKF0ofkIUu0aZ8')
  })(MapaAguachica)