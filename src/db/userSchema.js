import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email: String,
    n_control: Number,
    name: String,
    tel: String,
    career: String,
    age: String,
    password: String,
});

const User = mongoose.model('users', usersSchema);

export default User