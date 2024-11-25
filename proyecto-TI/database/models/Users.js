module.exports = function(sequelize, DataTypes) {
    /* alias */
    let alias = "Users";

    /* configuración de las columnas */
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    };

    /* configuración de la tabla */
    let config = {
        tableName: "users",
        timestamps: true, // Usar created_at y updated_at
        underscored: true // Usar snake_case en la base de datos
    };

    /* definir el modelo */
    let Users = sequelize.define(alias, cols, config);

    /* Asociaciones */
    Users.associate = function(models) {
        Users.hasMany(models.Product, {
            as: "products",
            foreignKey: "user_id",
        });
    };

    return Users;
};

