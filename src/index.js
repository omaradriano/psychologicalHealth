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
import appointments from './server/routes/appointments.routes.js';
import about from './server/routes/about.routes.js';

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
    secret: '123',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 36000000,
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
        console.log('No hay una sesion activa')
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

app.get('/resources', (req, res) => {
    if (req.session.user) {
        const data = req.session.user[0]
        res.render('resources.ejs', { user: data })
    } else {
        console.log('No hay una sesion activa')
        res.render('resources.ejs')
    }
})

//SIGNUP
app.use('/signup', signup)
//LOGIN
app.use('/login', login)
//FORUM
app.use('/forum', forum)
//APPOINTMENTS
app.use('/appointment', appointments)
//ABOUT
app.use('/about', about)

//Static files
app.use('/', express.static(path.join(__dirname, 'css'))); //Call css
app.use('/', express.static(path.join(__dirname, 'bootstrap'))); //Call bootstrap
app.use('/appointment', express.static(path.join(__dirname, 'bootstrap'))); //Call bootstrap
app.use('/appointment', express.static(path.join(__dirname, 'css'))); //Call bootstrap
app.use('/', express.static(path.join(__dirname, 'imgs'))); //Carpeta de imágenes
app.use('/', express.static(path.join(__dirname, 'scripts'))); //Carpeta de scripts

//Run server
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})