import React, { Fragment, useState } from 'react'
import { TitleContent } from '../layout/TitleContent';
import { WrapperContent } from '../layout/WrapperContent';
import { Query } from 'react-apollo'
import { OBTENER_BARRIOS, OBTENER_PERSONAS } from './../../queries'
import {
    PieChart, Pie, Legend, Tooltip, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid
} from 'recharts';
import html2pdf from 'html2pdf.js';


let Ibox = (props) => {
    return (
        <div className="col-md-12">
            <div className="ibox">
                <div className="ibox-title">
                    {props.titulo}
                </div>
                <div className="ibox-content">
                    <div className="col-md-12">
                        {props.content()}
                    </div>
                </div>
            </div>
        </div>
    )
}
const Reporte = () => {
    const [genero, setGenero] = useState('');
    const [perfil, setPerfil] = useState('');
    const [estadoContacto, setEstadoContacto] = useState('');
    const [barrio, setBarrio] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [tipo, setTipo] = useState('');
    const [totalFidelizados, setTotalFidelizados] = useState('');
    let input = {};
    let valor = {};
    let rangoEdad = (e) => {
        if (Number(min) >= 18 && min !== '') input['min'] = min
        if (Number(max) <= 20 && max !== '') input['max'] = max
        if (min === '') if (Object.getOwnPropertyNames(input).includes('min')) delete input['min']
        if (max === '') if (Object.getOwnPropertyNames(input).includes('max')) delete input['max']
    }

    let content = () => {
        let filtroProfesion = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por Perfil</strong></label>
                    <select
                        className="form-control"
                        name="profesion"
                        onChange={(e) => setPerfil(e.target.value)}
                        value={perfil}
                    >
                        <option value="">Todos</option>
                        <option value="admon">Administración de Empresas</option>
                        <option value="contaduria">Contaduría</option>
                        <option value="economía">Economía</option>
                        <option value="psicología">Psicología</option>
                        <option value="derecho">Derecho</option>
                        <option value="medicina">Medicina</option>
                        <option value="enfermeria">Enfermeria</option>
                        <option value="ingmecanica">Ing Mecanica</option>
                        <option value="ingcivil">Ing Civil</option>
                        <option value="ingsistemas">Ing Sistemas</option>
                        <option value="ingambiental">Ing Ambiental</option>
                        <option value="ingagro">Ing Agro Indudustrial</option>
                        <option value="modisteria">Modisteria</option>
                        <option value="belleza">Estetica belleza</option>
                        <option value="transpublico">Transporte público</option>
                    </select>
                </div>
            )
        }

        let filtroGenero = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por Género</strong></label>
                    <select
                        className="form-control"
                        name="perfil"
                        onChange={e => setGenero(e.target.value)}
                        value={genero}
                    >
                        <option value="">Ambos</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMENINO">Femenino</option>
                    </select>
                </div>
            )
        }
        let filtroRangoEdad = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por rango de edad</strong></label>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <input
                                    min="18"
                                    onBlur={(e) => {
                                        setMin(Number(e.target.value))
                                    }}
                                    type="number"
                                    className="form-control"
                                    placeholder="Mínimo"
                                    name="min"
                                />
                            </div>
                        </div>
                        <div className="col-md-1 mt-1">
                            <span style={{ marginTop: '2px' }}> <i className="fa fa-plus"></i></span>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <input
                                    max="100"
                                    onBlur={(e) => {
                                        setMax(Number(e.target.value))
                                    }}
                                    type="number"
                                    className="form-control"
                                    placeholder="Máximo"
                                    name="max"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        let filtroTipoCampaña = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por el tipo de campaña</strong></label>
                    <select
                        className="form-control"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="macro">Macro</option>
                        <option value="lider">Lider</option>
                        <option value="multip">Multiplicador</option>
                        <option value="votante">Votante</option>
                    </select>
                </div>
            )
        }
        let filtroCantidadVotosFide = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por cantidad de votos Fidelizados</strong></label>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Cantidad votos"
                        onBlur={(e) => setTotalFidelizados(Number(e.target.value))}
                    />
                </div>
            )
        }
        let filtroBarrio = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por barrios</strong></label>
                    <Query query={OBTENER_BARRIOS}>
                        {({ loading, error, data }) => {
                            if (loading) return 'Cargando...'
                            if (error) return 'Conexión fallida...'
                            return (
                                <select
                                    className="form-control"
                                    value={barrio}
                                    onChange={(e) => setBarrio(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {data.obtenerBarrios.map(barrio => (
                                        <option value={barrio.id} key={barrio.id}>{barrio.nombre}</option>
                                    ))}
                                </select>
                            )
                        }}
                    </Query>
                </div>
            )
        }
        let filtroEstadoContacto = () => {
            return (
                <div className="form-group">
                    <label className="col-form-label"><strong>Por estado de contacto</strong></label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-comments"></i></span>
                        <select
                            className="form-control"
                            name="estadoContacto"
                            value={estadoContacto}
                            onChange={(e) => setEstadoContacto(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="SEMANA">Esta semana</option>
                            <option value="MASSEMANA">Más de una semana</option>
                            <option value="MES">Más de un mes</option>
                        </select>
                    </div>
                </div>
            )
        }
        let filtroDatosPersonales = () => {
            return (
                <div>
                    {filtroGenero()}
                    {filtroProfesion()}
                    {filtroRangoEdad()}
                    {filtroEstadoContacto()}
                    {filtroBarrio()}
                    <div className="col-md-12 d-flex justify-content-center">
                            <button 
                                className="btn btn-primary"
                                onClick= {() => {
                                    let html = document.getElementById('pdf');
                                    html2pdf().from(html).set({
                                        filename: 'reporte.pdf',
                                        margin: 4
                                    }).save();
                                }}
                            >
                                <i className="fa fa-file-pdf-o"/> Generar PDF
                            </button>
                        </div>
                </div>
            )
        }
        let filtroDatosCampaña = () => {
            return (
                <div>
                    {filtroTipoCampaña()}
                    {filtroCantidadVotosFide()}
                </div>
            )
        }
        let properties = { genero, estadoContacto, perfil, tipo, barrio, min, max, totalFidelizados };
        let nameProperties = Object.getOwnPropertyNames(properties)
        Object.values(properties).map((variable, i) => {
            if (i === 5 || i === 6 || i === 7) {
                if (variable > 0) input[`${nameProperties[i]}`] = variable
            }
            else {
                if (variable !== '') input[`${nameProperties[i]}`] = variable
            }
        })
        console.log(input)
        let graphics = (data) => {
            let totalRestante = 0;
            let totalBusqueda = 0;
            if(Object.keys(input).length === 0) {
                totalBusqueda = 0;
                totalRestante = data.totalPersonas;
            }
            else {
                totalRestante = data.totalPersonas - data.obtenerPersonas.length;
                totalBusqueda = data.obtenerPersonas.length
            }
            let Ibox = (props) => {
                return (
                    <div className={`col-md-${props.col}`}>
                        <div style={{ paddingBottom: '0px' }} className="ibox">
                            <div className="ibox-title">
                                <h5>{props.titulo}</h5>
                            </div>
                            <div  className="ibox-content">
                                {props.content()}
                            </div>
                        </div>
                    </div>
                )
            }
            let porcentaje = (total) => (Math.floor(total * 100 / data.totalPersonas))
            console.log( (totalRestante * 100) / data.totalPersonas, 'asd' )
            let graphBar = () => {
                const data = [
                    {
                      name: 'Total Restante', valor: totalRestante
                    },
                    {
                      name: 'Total Búsqueda', valor: totalBusqueda
                    }
                  ];
                  return(
                      <div>
                        <BarChart
                            width={300}
                            height={250}
                            data={data}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="valor" fill="#8884d8" />
                            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                        </BarChart>
                        {data.totalPersonas}
                      </div>
                  )
            }
            let graphCircle = () => {
                const data01 = [
                    { name: '% Total Búsqueda', value: porcentaje(totalBusqueda) },
                    { name: '% Total Restante', value: porcentaje(totalRestante)  }
                ];
                return (
                        <PieChart
                            width={280}
                            height={270}
                            margin={{
                                top: 30,
                                left: 40
                            }}
                        >
                            <Pie dataKey="value" isAnimationActive={true} data={data01} cx={80} cy={80} outerRadius={80} fill="#31BB9F" label />
                            <Tooltip />
                        </PieChart>
                )
            }
            return (
                <div className="col-md-12">
                    <div className="row">
                        <Ibox titulo="Diagrama circular (%)" col={5} content={graphCircle}/>
                        <Ibox titulo="Diagrama de barras" col={7} content={graphBar}/>
                    </div>
                </div>
            )
        }
        let contentTable = (data, total) => (
            <div className="ibox">
                <div className="ibox-title">
                    <h3 className="text-center">Resultados de la búsqueda</h3>
                </div>
                <div className="ibox-content">
                    <div  className="table-responsive">
                        <p stlye={{fontSize: '18px'}}><strong>Total general: {total}</strong></p>
                        <p stlye={{fontSize: '18px'}}><strong>Total resultados búsqueda: {data.length}</strong></p>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Genero</th>
                                    <th>Tipo</th>
                                    <th>Celular</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((persona, i) => (
                                    <tr key={persona.id}>
                                        <td>{i + 1}</td>
                                        <td>{persona.nombre} {persona.apellido}</td>
                                        <td>{persona.edad}</td>
                                        <td>{persona.genero}</td>
                                        <td>{persona.tipo}</td>
                                        <td>{persona.celular}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
        let resultados = () => {
            return (
                <Fragment >
                    <div id="pdf">
                        <Query variables={{ input, filtro: true, all: true }} query={OBTENER_PERSONAS}>
                            {({ loading, error, data }) => {
                                if (loading) return 'Cargando...'
                                if (error) return 'Error de conexión'
                                console.log(data)
                                if (data.obtenerPersonas.length === 0) {
                                    return (
                                        <h3 className="text-center">
                                            <i style={{ color: '#d60000' }} className="fa fa-times-circle" /> No hay resultados que coincidan con la búsqueda
                                        </h3>
                                    )
                                }
                                else {
                                    return (
                                        <Fragment>
                                            {graphics(data)}
                                            {contentTable(data.obtenerPersonas, data.totalPersonas)}
                                        </Fragment>
                                    )
                                }
                            }}
                        </Query>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-8">
                        {resultados()}
                    </div>
                    <div className="col-md-4">
                        <Ibox titulo="Filtrar por datos personales" content={filtroDatosPersonales} />
                        <Ibox titulo="Filtrar por datos de campaña" content={filtroDatosCampaña} />
                    </div>
                </div>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <TitleContent title="Reporte" subtitle="estadisticas" />
            <WrapperContent content={content} />
        </Fragment>
    )
}

export default Reporte;