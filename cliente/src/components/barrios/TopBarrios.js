import React, { Fragment, useState } from 'react'
import { Query } from 'react-apollo'
import { TOP_BARRIOS } from './../../queries'
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


export const TopBarrios = (props) => {
    const [tipoGrafica, setTipoGrafica] = useState('fill');
    const grafica = (topBarrios) => {
        if (tipoGrafica === 'fill') return (
            <AreaChart
                width={300}
                height={200}
                data={topBarrios}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="votosFide" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        )
        else return (
            <LineChart
                width={300}
                height={200}
                data={topBarrios}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                {/* <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} /> */}
                {/* <Line type="monotone" dataKey="votoFide" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                <Line type="monotone" dataKey="votosFide" stroke="#82ca9d" />
            </LineChart>
        )
    }
    return (
        <div className="co-md-12">
            <div className="ibox">
                <div className="ibox-title">
                    <h3 className="text-center">Top 5 Barrios Fidelizados</h3>
                </div>
                <div className="ibox-content">
                    <p>
                        <select value={tipoGrafica} onChange={(e) => {
                            console.log('value', e.target.value)
                            setTipoGrafica(e.target.value)} }>
                            <option value="line">Linea</option>
                            <option value="fill">Area</option>
                        </select>
                    </p>
                    <Query query={TOP_BARRIOS} variables={{ zona: props.zona }}>
                        {({ loading, error, data }) => {
                            try {
                                if (loading) return 'Cargando...'
                                if (error) return 'Error de red...'
                                console.log('data', data.topBarrios)
                                return (
                                    <Fragment>
                                        <div style={{padding: '0px'}} className="col-md-12 ">
                                            {grafica(data.topBarrios)}
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre</th>
                                                        <th>Fidelizados</th>
                                                        <th>Porcentaje</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.topBarrios.map((barrio, i) => (
                                                        <tr key={barrio.id}>
                                                            <td>{i + 1}</td>
                                                            <td>{barrio.nombre}</td>
                                                            <td>{barrio.votosFide}</td>
                                                            <td>{barrio.votosFide}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Fragment>
                                )
                            } catch (error) {
                                console.log(error)
                            }

                        }}
                    </Query>
                </div>
            </div>
        </div>
    )
}