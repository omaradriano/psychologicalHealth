import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date, //Fecha de publicacion
    owner: String, //Owner 
    mode: String, //Muestra si necesita ayuda o la ofrece
    anonym: Boolean, //Establece si se muestra el nombre real de la persona
    comments: Array
});

const Post = mongoose.model('posts', postSchema);

export default Post