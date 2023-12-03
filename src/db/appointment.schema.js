import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date, //Fecha de publicacion
    owner: String, //Owner 
    tel: Number,
    
});

const Post = mongoose.model('posts', postSchema);

export default Post