const db = require('../database/models');
const op = db.Sequelize.Op;

const indexController = {
    // Mostrar todos los productos
    list: (req, res) => {
        db.Product.findAll()
            .then(products => {
                return res.render('index', { products}); // Renderiza la vista 'products.ejs' con los productos
            })
            .catch(err => {
                console.log(err);

            });
    },
};

module.exports = indexController;