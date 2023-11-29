import { Router } from 'express'
// import { Mongoose } from 'mongoose'
import User from '../../db/userSchema.js';
import mongoose from 'mongoose';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const forum = Router()

forum.get('/', (req, res) => {
    res.render('forum.ejs')
})

export default forum