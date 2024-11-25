var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */

router.get('/', indexController.list);
router.get('/index', indexController.list);

module.exports = router;
