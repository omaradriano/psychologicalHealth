import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    owner: String,
});

const Post = mongoose.model('posts', postSchema);

export default Post