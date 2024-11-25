var express = require('express');
var router = express.Router();
const userController = require('../controllers/usercontroller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res) {
  res.render('register'); // Asegúrate de que exista la vista 'register'
});

/* POST para procesar el formulario de registro */
router.post('/register', userController.register);

/* GET para mostrar el formulario de login */
router.get('/login', function (req, res) {
  res.render('login'); // Asegúrate de que exista la vista 'login'
});

/* POST para procesar el formulario de login */
router.post('/login', userController.login);
module.exports = router;
