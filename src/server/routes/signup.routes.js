import { Router } from 'express'
// import { Mongoose } from 'mongoose'
import User from '../../db/userSchema.js';
import mongoose from 'mongoose';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const signup = Router()

signup.get('/', (req, res) => {
    res.render('signup.ejs', {})
})
signup.get('/data', (_req, res) => [
    User.find({}, "")
        .then(data => res.send(data))
])
signup.post('/', async (req, res) => {

    const {
        email, n_control, name, tel, career, age, password, repeatPass
    } = req.body
    const renderData = req.body

    const data = await User.find({ n_control: n_control })
    console.log(data)
    if(data.length !== 0){
        if(data[0].n_control === parseInt(n_control)){
            console.log('El usuario ya existe')
            res.render('signup.ejs', {error: 'El usuario ya existe'});
            return
        }
    }
    
    //Si llegamos aquí, significa que el usuario no existe y las contraseñas coinciden
    const newUser = new User({
        email: `l${n_control}@chihuahua2.tecnm.mx`, //Únicamente hay existencia de correos institucionales
        n_control: n_control,
        name: name,
        tel: tel,
        career: career,
        age: age,
        password: password,
    });

    console.log('Usuario registrado')
    newUser.save();
    res.redirect('/');
})

export default signup