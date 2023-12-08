import { Router } from 'express'
import mongoose from 'mongoose';
import Post from '../../db/post.schema.js';

// Obtén los datos de conexión desde las variables de entorno o configúralos directamente aquí.
const MONGODB_URI = 'mongodb://127.0.0.1:27017/psychologicalHealth';

// Configura y realiza la conexión a la base de datos
mongoose.connect(MONGODB_URI)

const forum = Router()

forum.get('/', async (req, res) => {

    try {
        const posts = await Post.find({})
        if (req.session.user) {
            const data = req.session.user[0]
            // console.log(data)
            res.render('forum.ejs', { user: data, posts: posts })
        } else {
            console.log('No hay una sesion activa')
            res.render('forum.ejs', { posts: posts })
        }
    } catch (error) {
        console.log(error)
    }
})

forum.post('/post', async (req, res) => {

    const { title, description, anonym, mode } = req.body

    try {
        if (req.session.user) {
            const post = new Post({
                title: title,
                description: description,
                date: new Date(),
                owner: req.session.user[0].n_control,
                anonym: anonym === 'on' ? true : false,
                mode: mode,
                comments: []
            });

            console.log(`Post agregado por ${req.session.user[0].n_control}`)
            await post.save();
            res.redirect('/forum');
        }
    } catch (error) {
        console.log(error)
    }
    // res.send('Se ha publicado un post')
})

forum.get('/delete/:_id', async (req, res) => {
    const { _id } = req.params
    console.log(req.params._id)
    await Post.deleteOne({ _id: _id })
    res.redirect('/forum')
})

forum.delete('/delete/:_id', async (req, res) => {
    const { _id } = req.params
    console.log(req.params._id)
    const deleted = await Post.deleteOne({ _id: _id })
    console.log(deleted)
    console.log('Se ha eliminado un elemento')
    res.send('Se ha eliminado un elemento')
})

forum.patch('/update/:_id', async (req, res) => {
    const { _id } = req.params
    let updatedData = {
        title: 'Titulo experimental',
        description: 'Descripción experimental'
    }

    /**Si quisiera editarse desde un formulario solo se deben de recibir los datos en el req.body
     * En caso de haber campos vacios eliminarlos por que si no
    */

    console.log(req.params._id)
    const edited = await Post.updateOne({ _id: _id }, {$set:updatedData})
    console.log(edited)
    res.send('Se ha editado un elemento')
})

export default forum