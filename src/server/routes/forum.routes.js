import { Router } from 'express'
// import { Mongoose } from 'mongoose'
import mongoose from 'mongoose';
import Post from '../../db/postSchema.js';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const forum = Router()

forum.get('/', (req, res) => {
    if (req.session.user) {
        const data = req.session.user[0]
        res.render('forum.ejs', { user: data })
    } else {
        console.log('No existe una sesion')
        res.render('forum.ejs')
    }
})

forum.post('/post', (req, res) => {

    console.log(req.body)
    const { title, description, anonym, mode } = req.body

    if (req.session.user) {
        const post = new Post({
            title: title,
            description: description,
            date: new Date(),
            owner: req.session.user[0].name,
            anonym: anonym === 'on' ? true : false,
            mode: mode,
            comments: []
        });

        console.log(`Post agregado por ${req.session.user[0].n_control}`)
        post.save();
        res.redirect('/');
    }
    // res.send('Se ha publicado un post')
})

export default forum