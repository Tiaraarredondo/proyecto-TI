const db = require('../database/models');

const indexController = {
    // Mostrar todos los productos ordenados por fecha descendente
    list: (req, res) => {
        db.Product.findAll({
            order: [['created_at', 'DESC']], // Ordena los productos por la columna 'created_at' en forma descendente
        })
        .then(products => {
            return res.render('index', { products }); // Renderiza la vista 'index.ejs' con los productos
        })
        .catch(err => {
            console.error('Error al obtener los productos:', err);
            res.status(500).send('Error al cargar los productos');
        });
    },
};

module.exports = indexController;
