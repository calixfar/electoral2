import Barrio from './../../models/Barrio'
import { resolve } from 'dns';
import { rejects } from 'assert';

export  const searchIdBarrio = (root,{nombre}) => {
    console.log(nombre)
    return new Promise((resolve,rejects) => {
        Barrio.findOne({nombre}, (error, barrio) => {
            if(error) rejects(error)
            else resolve(barrio)
        })
    })
}
export const obtenerBarrios = (root, {id,input,limit,offset}) => {
        const zona = (input && Object.keys(input).length > 0) ?input.zona : {$type : 7}
        return Barrio.find({zona}).limit(limit).skip(offset)
}

export const obtenerBarrio = (root, {id}) => {
    return new Promise((resolve,rejects) => {
        Barrio.findById(id, (error, barrio) => {
            if(error) rejects(error)
            else resolve(barrio)
        })
    })
}
export const totalBarrios = (root, {input}) => {
    const zona = (input && Object.keys(input).length > 0) ?input.zona : {$type : 7}
    return new Promise((resolve,rejects) => {
        Barrio.countDocuments({zona}, (error, count) => {
            if(error) rejects(error)
            else resolve(count)
        })
        
    })
}