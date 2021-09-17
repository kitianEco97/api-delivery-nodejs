const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');

/*
    INICIALIZAR FIREBASE ADMIN
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
});

/*
    RUTAS
*/
const users = require('./routes/userRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

// llamando a las rutas
users(app, upload);
categories(app);
address(app);
products(app, upload);

server.listen(3000, '192.168.1.86' || 'localhost', function() {
    console.log('Aplicacion NodeJS ' + port + ' iniciada...');
});

// ERROR HANDLER 
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).send(error.status);
})

module.exports = {
    app: app,
    server: server
}