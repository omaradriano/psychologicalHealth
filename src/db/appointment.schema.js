import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    description: String,
    date: Date, //Fecha de publicacion
    patient: String, //Owner 
    n_control: Number, 
    tel: Number,
    specialist: String

});

const Appointment = mongoose.model('appointments', appointmentSchema);

export default Appointment