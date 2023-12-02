import { Router } from 'express'
import mongoose from 'mongoose';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const about = Router()

about.get('/', (req, res) => {
    if (req.session.user) {
        const data = req.session.user[0]
        res.render('about.ejs', { user: data })
    }else{
        res.render('about.ejs')
    }
})

export default about