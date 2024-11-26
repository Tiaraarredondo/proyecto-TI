var express = require('express');
var router = express.Router();

const productController = require('../controllers/productcontroller');

/* GET list of movies */
router.get('/', productController.list);

/* GET movie detail by ID */
router.get('/detail/:id', productController.detail);

/* GET last 5 movies */

router.get('/agregar-producto', productController.agregarProducto);

/* GET recommended movies */
router.get('/recommended', productController.recommended);

router.get('/search-results',productController.buscar);

router.post('/submit', productController.productoSubmit);

module.exports = router;