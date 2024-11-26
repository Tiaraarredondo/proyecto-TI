const db = require('../database/models');
const { search } = require('../routes');
const op = db.Sequelize.Op;

const productController = {
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
    detail: function (req, res) {
        const { id } = req.params;
        db.Product.findByPk(id)
            .then(product => {
                if (product) {
                    res.render('product', { product }); // Renderiza la vista con el producto
                } else {
                    res.status(404).send('Producto no encontrado'); // Producto no encontrado
                }
            })
            .catch(error => {
                console.log(error); // Registra errores inesperados
            });
    },

    // Mostrar el formulario para crear un nuevo producto
    new: function (req, res) {
        db.Product.findAll({
            order: [['created_at', 'DESC']], // Ordena por fecha de creación descendente
            limit: 5 // Limita el resultado a los últimos 5 productos
        })
            .then(product => {
                res.render('product/new', { product }); // Renderiza una vista para mostrar los productos
            })
            .catch(error => {
                console.log(error); // Maneja errores
                res.status(500).send('Error al listar los productos más recientes'); // Responde con un error si algo falla
            });
    },
    recommended: function (req, res) {
        db.Product.findAll({
            where: { rating: { [op.gte]: 8 } }
        })
            .then(product => {
                res.render('index/recommended', { product });
            })
            .catch(error => {
                console.log(error);
            });
    },
    
    buscar: (req, res) => {
        const { search } = req.query; // Obtén el término de búsqueda desde la query string
    
        // Verificar si el término de búsqueda está presente
        if (!search) {
          return res.status(400).send('No se especificó término de búsqueda');
        }
    
        // Realizar la búsqueda en la base de datos
        db.Product.findAll({
          where: {
            name: { [op.like]: `%${search}%` } // Búsqueda usando LIKE
          }
        })
        .then(products => {
          // Renderizar los resultados de la búsqueda
          res.render('search-results', { products: products, query: search });
        })
            .catch(error => {
                console.log(error); // Loguea errores inesperados.
                res.status(500).send('Hubo un error al realizar la búsqueda'); // Responde con un mensaje genérico.
            });
    }
    
};

module.exports = productController;
