import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export function conectar(){
    mongoose.connect('mongodb://localhost:27017/electoral', {useNewUrlParser: true})
    mongoose.set('setFindAndModify', false);
}

