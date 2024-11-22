module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      'Product', // Nombre del modelo
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: 'products', // Nombre de la tabla en la base de datos
        timestamps: true,      // Incluye las columnas createdAt y updatedAt
      }
    );
  
    // Aquí puedes definir asociaciones si existen
    Product.associate = (models) => {
      // Ejemplo: Producto pertenece a una categoría
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    };
  
    return Product;
  };
  