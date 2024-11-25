const db = require('../database/models'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para encriptar las contraseñas

const userController = {
    login: function (req,res) {
        if (req.session.usuarioLogueado != undefined) {
            return res.redirect("/");
        }
        db.Usuario.findOne({
            where: {
                [op.or]: [
                    {email: req.body.nombre},
                    {nombre: req.body.nombre}
                ]
            }
        })
        .then(function (usuario) {
            if(!usuario){
                return res.redirect('/usuario/login?error=usuario');
            } else if (bcrypt.compareSync(req.body.password, usuario.password) == false ){
                return res.redirect('/usuario/login?error=password');
            }else{
                req.session.usuarioLogueado = usuario;
                if(req.body.recordar != undefined){
                    res.cookie('usuarioLogueadoId', usuario.id, { maxAge: 1000 * 60 * 60 * 24 * 365});
                }
                
                return res.redirect('/')
            }
        })
        .catch( function(error){
            console.log(error);
        })
    },

    register: function (req,res) {
        if (req.session.usuarioLogueado != undefined) {
            return res.redirect("/");
        }
        if(req.query.error){
            return res.render('registro', {title: 'Registración', error: true, message:'El nombre de usuario o email ya existe'});
        }else{
            return res.render('registro', {title: 'Registración', error: false, message:'El nombre de usuario o email ya existe'});
        }
    },


    logout: function (req,res) {
        req.session.usuarioLogueado = undefined;
        res.clearCookie('idUsuario');
        return res.redirect('/');
        
    },
};

module.exports = userController;