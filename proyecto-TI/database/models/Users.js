module.exports = (sequelize, DataTypes) => {
    const alias = "Users" ;
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        contraseña: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "users"
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.Comments, { 
            foreignKey: 'user_id',
            as: 'comment'
        })
    };

    User.associate = function (models) {
        User.hasMany(models.Product, { 
            foreignKey: 'user_id',
            as: 'products'
        })
    }

    return User;

}