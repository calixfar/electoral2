import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const cerrarSesion = (cliente, history) => {
    localStorage.removeItem('token', '');
    cliente.resetStore();
    history.push('/login')
}
const CerrarSesion = ({history}) => (
    <ApolloConsumer>
        {( cliente ) => {
            return (
                <a onClick={() => cerrarSesion(cliente, history)}>
                    <i className="fa fa-sign-out" /> Cerrar Sesión
                </a>
            )
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSesion);
