import { Router } from 'express'
// import { Mongoose } from 'mongoose'
import User from '../../db/user.schema.js';
import mongoose from 'mongoose';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const login = Router()

login.get('/', (_req, res) => {
    res.render('login.ejs')
})

login.post('/', async (req, res) => { // /login
    const { n_control, password } = req.body;

    try {
        // Buscar usuario por número de control
        const user = await User.find({ n_control: n_control });

        if (user.length > 0 && user[0].password === password) {
            // El usuario existe y la contraseña es correcta
            req.session.user = user
            console.log('Sesion registrada');
            res.redirect('/'); // Ajusta según tu ruta deseada después de iniciar sesión
        } else {
            // El usuario no existe o la contraseña es incorrecta
            res.render('login.ejs', { error: 'Credenciales incorrectas. Intentar de nuevo' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default login