import { Router } from 'express'
import mongoose from 'mongoose';
import Appointment from '../../db/appointment.schema.js';
import User from '../../db/user.schema.js';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const appointments = Router()

appointments.get('/', async (req, res) => {
    const mentors = await User.find({role: "mentor"})
    console.log(mentors)
    if (req.session.user) {
        const data = req.session.user[0]
        res.render('appointment.ejs', { user: data, mentors: mentors })
    } else {
        res.render('appointment.ejs', {mentors: mentors})
    }
})

appointments.post('/', async (req, res) => {
    console.log(req.body)
    const { description, specialist, appointmentDate, appointmentHour } = req.body
    try {
        if (req.session.user) {
            const appointment = new Appointment({
                description: description,
                date: new Date(`${appointmentDate}UTC${appointmentHour}`), //Fecha de publicacion
                patient: req.session.user[0].name, //Owner 
                n_control: req.session.user[0].n_control,
                tel: req.session.user[0].tel,
                specialist: specialist
            });

            console.log(`Post agregado por ${req.session.user[0].n_control}`)
            await appointment.save();
            res.redirect('/forum');
        }else{
            res.redirect('/login')
            throw new Error('No se encuentra una sesion activa')
        }
    } catch (error) {

        console.log(error)
    }
})

appointments.get('/list', async (req, res) => {
    
    if (req.session.user) {
        const appointments = await Appointment.find({specialist: req.session.user[0].name})
        const data = req.session.user[0]
        res.render('listAppointments.ejs', { user: data, appointments: appointments})
    } else {
        res.render('listAppointments.ejs')
    }
})

export default appointments