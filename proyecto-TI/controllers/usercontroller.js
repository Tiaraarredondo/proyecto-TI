const db = require('../database/models');
const op = db.Sequelize.Op; // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para encriptar las contraseñas

const userController = {
    login: function (req,res) {
        if (req.session.usuarioLogueado != undefined) {
            return res.redirect("/");
        }
        db.User.findOne({
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
        db.User.findOne({
            where: {
                [op.or]:[
                    {email: req.body.email},
                    {nombre: req.body.nombre}
                ]
            }
        })
        .then(function (usuario) {
            if(req.body.email == ""){
                res.render('registro', {title: 'Registración', error: true, message:'El email no puede estar vacío'});
            } else if (req.body.contraseña == ""){
                return res.render('registro', {title: 'Registración', error: true, message:'La contraseña no puede estar vacía'});
            } else if (usuario != null){
                return res.render('registro', {title: 'Registración', error: true, message:'El nombre de usuario o el email ya existe. Elija otro.'});
            } else if(usuario == null){
                let contraseña = bcrypt.hashSync(req.body.contraseña, 10);

                db.User.create({
                    nombre: req.body.nombre,
                    email: req.body.email,
                    contraseña: contraseña,
                })
                .then(function () {
                    return res.redirect('/user/login');
                })
            }else {
                return res.redirect('/user/register?error=true');
            }
            
        })
        .catch( function(error){
            console.log(error);
        })
    },


    logout: function (req,res) {
        req.session.usuarioLogueado = undefined;
        res.clearCookie('idUsuario');
        return res.redirect('/');
        
    },
};

module.exports = userController;