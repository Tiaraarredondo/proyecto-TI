var express = require('express');
var router = express.Router();

const productController = require('../controllers/productcontroller');

/* GET list of movies */
router.get('/', productController.list);

/* GET movie detail by ID */
router.get('/detail/:id', productController.detail);

/* GET last 5 movies */
router.get('/new', productController.new);

/* GET recommended movies */
router.get('/recommended', productController.recommended);

module.exports = router;