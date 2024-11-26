const db = require('../database/models');
const op = db.Sequelize.Op;

const productController = {
    // Mostrar todos los productos
    list: (req, res) => {
        db.Product.findAll()
            .then(products => {
                return res.render('index', { products }); // Renderiza la vista 'products.ejs' con los productos
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Mostrar el formulario para crear un nuevo producto
    agregarProducto: function (req, res) {
        if (req.session.usuarioLogueado == undefined) {
            return res.redirect("/"); // Si no está logueado, redirigir a la página principal
        }
        return res.render('product-add', { title: 'Agregar Producto' }); // Muestra el formulario
    },

    // Enviar los datos del producto a la base de datos
    productoSubmit: function (req, res) {
        if (req.session.usuarioLogueado == undefined) {
            return res.redirect("/"); // Si no está logueado, redirigir a la página principal
        }
    
        // Validación de los campos requeridos
        if (!req.body.nombre || !req.body.imagen || !req.body.descripcion || !req.body.precio) {
            return res.status(400).send('Todos los campos son obligatorios');
        }
    
        let idUsuario = req.session.usuarioLogueado.id;
    
        // Crear el producto en la base de datos
        db.Product.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            img_url: req.body.imagen, // Asegúrate de que la imagen esté correctamente cargada
            usuario_id: idUsuario, // Asocia el producto con el usuario logueado
        })
        .then(function (newProduct) {
            // Redirigir al detalle del producto después de agregarlo
            return res.redirect('/productos/detalle/' + newProduct.id);
        })
        .catch(function (error) {
            console.log(error); // Loguea el error en caso de que haya un fallo
            res.status(500).send('Hubo un error al guardar el producto');
        });
    },

    // Mostrar los detalles de un producto
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

    // Mostrar productos recomendados
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

    // Realizar búsqueda de productos
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
