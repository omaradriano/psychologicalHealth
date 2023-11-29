import express from 'express'
import bodyParser from 'body-parser'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import session from 'express-session'

//Routes
import signup from './server/routes/signup.routes.js';
import login from './server/routes/login.routes.js';
import forum from './server/routes/forum.routes.js';

//Importar dotenv para variables de entorno
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

const app = express()
const port = process.env.PORT

//Middlewares
app.use(morgan('dev'))

//SESSION
app.use(session({
    // Se recomienda cambiar en cada entorno
    // https://parzibyte.me/blog/2020/06/02/sesiones-node-express-js/#Configurar_uso_de_sesion
    secret: '123',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60000,
    }
}));

//Otra cosas que no se en que seccion van xd
app.use(bodyParser.urlencoded({ extended: false }));

//Engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views/'))
app.set('include', path.resolve(__dirname, 'views/include'))

//Main verbs
app.get('/', (req, res) => {
    if (req.session.user) {
        const data = req.session.user[0]
        res.render('index.ejs', { user: data })
    } else {
        console.log('No existe una sesion')
        res.render('index.ejs')
    }

})

app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                res.status(500).send('Error interno del servidor');
            } else {
                // Redirigir a la página de inicio de sesión u otra página
                res.redirect('/');
            }
        });
    }
})


//SIGNUP
app.use('/signup', signup)
//LOGIN
app.use('/login', login)
//FORUM
app.use('/forum', forum)

//Static files
app.use('/', express.static(path.join(__dirname, 'css'))); //Call css
app.use('/', express.static(path.join(__dirname, 'bootstrap'))); //Call bootstrap
app.use('/', express.static(path.join(__dirname, 'imgs'))); //Call bootstrap

//Run server
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})