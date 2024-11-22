/*const db = require('../database/models');
const op = db.Sequelize.Op;

const UserController = {

  // Listar todos los productos
  list: function(req, res) {
    db.Product.findAll()
      .then(products => {
        res.render('products/list', { products });
      })
      .catch(error => {
        console.log(error);
        
      });
  },

  // Detalle de un producto específico
  detail: function(req, res) {
    const { id } = req.params;
    db.Product.findByPk(id)
      .then(product => {
        if (product) {
          res.render('product/detail', { product });
        } else {
          res.status(404).send('Producto no encontrado');
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  // Últimos 5 productos 
  new: function(req, res) {
    db.Product.findAll({
      order: [['release_date', 'DESC']],
      limit: 5
    })
    .then(products => {
      res.render('products/new', { products });
    })
    .catch(error => {
        console.log(error);
    });
  },

  // Películas recomendadas (rating >= 8)
  recommended: function(req, res) {
    db.Product.findAll({
      where: { rating: { [op.gte]: 8 } }
    })
    .then(products => {
      res.render('products/recommended', { products });
    })
    .catch(error => {
        console.log(error);
    });
  }
};

module.exports = userController;*/