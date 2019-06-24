import {Zona} from '../../models/Zona'
import mongoose from 'mongoose'
export const crearZona = (root, {input}) => {
    console.log(input)
    const nuevaZona =  new Zona({
        barrios: input.barrios,
        nombre: input.nombre,
    });
    nuevaZona.id = nuevaZona._id;
    return new Promise((resolve, rejects) => {
        nuevaZona.save(error => {
            if(error) rejects(error)
            else resolve(nuevaZona)
        })
    })
}
export const actualizarZona = (root, {input}) => {
return new Promise((resolve, rejects) => {
    Zona.findOneAndUpdate({_id: input.id}, input, {new: true} ,(error, zona) => {
        if(error) rejects(error)
        else resolve(zona)
    })
})
}
export const eliminarZona = (root, {id}) => {
    console.log(id)
    return new Promise((resolve, rejects) => {
        Zona.findOneAndDelete({_id : id}, (error) => {
            if (error) rejects(error)
            else resolve('Se elimino correctamente')
        })
    })
};

