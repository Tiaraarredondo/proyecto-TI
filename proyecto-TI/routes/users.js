var express = require('express');
var router = express.Router();
const userController = require('../controllers/usercontroller');

// Ruta para la vista de registro
router.get('/register', function (req, res) {
  res.render('register'); // Renderiza la vista de registro (registro.ejs)
});

// Ruta POST para procesar el registro
router.post('/register', userController.register); // Aquí se procesan los datos del formulario

// Ruta para la vista de login
router.get('/login', function (req, res) {
  res.render('login'); // Renderiza la vista de login (login.ejs)
});

// Ruta POST para procesar el login
router.post('/login', userController.login); // Aquí se procesan los datos del formulario de login

module.exports = router;

