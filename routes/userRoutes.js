const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    // obtener datos
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), UsersController.findById);

    // auth
    //app.post('/api/users/create', UsersController.register);
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);
    // actualizar datos
    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update)
};