import React, { Component } from 'react'
import memoize from 'memoize-one'


export default class Paginador extends Component {
    state = {
        paginas: Math.ceil(this.props.total / this.props.limite)
    }
    numPaginas = () => {
          this.paginas= Math.ceil(this.props.total / this.props.limite)
    }
    Paginas = () => {
        const paginas = this.getPaginas(Math.ceil(this.props.total / this.props.limite))
        let array = [];

        for(let i = 0; i < paginas; i++){
            array.push(i)
        }
        return(
            array.map(array => {
                const active = (this.props.actual === array+1) ? 'active' : ''
                return(
                    <li key={array} className={`page-item ${active}`}>
                        <a value={array} onClick={e => this.props.numeroPagina(array+1)} key={array} className="page-link" >{array+1}</a>
                    </li>
            )
            })
        )
    }
    getPaginas = memoize(paginas => paginas)
    render() {
        const paginas = this.getPaginas(Math.ceil(this.props.total / this.props.limite))
        const {actual} = this.props
        {console.log('actual',actual,'paginas',paginas)}
        const btnAtras = (actual > 1) ? 
                <li className="page-item">
                    <a  type="button" onClick={this.props.anterior} className="page-link">Anterior</a>
                </li> : '';
        const btnSiguiente = ( actual < paginas ) ?
                <li className="page-item">
                    <a type="button" className="page-link" onClick={this.props.siguiente} >Siguiente</a>
                </li> : '';
        return (
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        {btnAtras}
                        {this.Paginas()}
                        {btnSiguiente}
                    </ul>
                </nav>
            </div>
        )
    }
}
