import Persona from './../../models/Persona'
import { rejects } from 'assert';
import mongoose from 'mongoose';


export const obtenerPersonas = async (root, {input,limite,offset}) => {
    let param = {tipo: input.tipo}
    if(Object.keys(input).length > 1){
        let property = Object.getOwnPropertyNames(input).includes('nombre') ? 'nombre' : 'cedula'
        param[property] = {$regex: new RegExp(`^${input[property]}`)}
    }
    const personsTipo = await asyncObtenerPersonas(param,limite,offset)
    personsTipo.total = await Persona.countDocuments(param);
    return personsTipo;
    // const tipo = (input && input.tipo && input.tipo != 'ninguna')? input.tipo :{$type: 2};
    // return Persona.find({tipo}).limit(limite).skip(offset);
}

export const obtenerPersona = (root, {id}) => {
    return new Promise((resolve,rejects) => {
        Persona.findById({_id: id}, (error, persona) => {
            if(error) rejects(error)
            else resolve(persona)
        })
    })
}
export const validarCedula = (root, {cedula}) => {
    console.log(cedula)
    return Persona.find({cedula})}

const asyncObtenerPersonas = (param,limit,offset) => Persona.find(param).limit(limit).skip(offset).exec()
export const obtenerPersonasCumple = async () => {
    let param = {mensajeCumple: false}
    //param['mensajeCumple'] = false;
    const persons = await asyncObtenerPersonas(param)
    let cumple = '';
    let fechaActual = new Date()
    let dia = fechaActual.getDate(), mes = fechaActual.getMonth(), anio = fechaActual.getFullYear();
    let arrayCumple = []
    persons.map((person, i) => {
        cumple = person.fechaCumple ? person.fechaCumple : ''
        if(cumple !== ''){
            if((cumple.getDate()+1) === dia && mes === cumple.getMonth()) {
                arrayCumple.push(person);
                arrayCumple[arrayCumple.length - 1].edad = anio - cumple.getFullYear();
            }
            cumple = ''
        }
    })
    return(arrayCumple)
    // let fechaActual = new Date()
    // let dia = fechaActual.getDate(), mes = fechaActual.getMonth();
    // let regex = new RegExp(`^[0-9]{4}-${mes}-${dia}`)
    // return Persona.find({fechaCumple: {$dateFromParts: {
    //     'month': mes,
    //     'day': dia
    // }}})
}
export const obtenerPersonasSuperior = (root, {input}) => {
    if(input && input.tipo) {
        return Persona.find({'superior.id' : input.id, tipo: input.tipo })}
    else return Persona.find({'superior.id' : input.id})
}

export const totalPersonas = (root, {input}) => {
    let param = {tipo: input.tipo}
    if(Object.keys(input).length > 1){
        let property = Object.getOwnPropertyNames(input).includes('nombre') ? 'nombre' : 'cedula'
        param[property] = {$regex: new RegExp(`^${input[property]}`)}
    }
    return new Promise((resolve, rejects) => {
        Persona.countDocuments(param, (error,count) => {
            if(error) rejects(error)
            else resolve(count)
        })
    })
}