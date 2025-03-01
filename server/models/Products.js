module.exports = (Sequelize, DataTypes) => {
  const Products = Sequelize.define("Products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Optional image field
    },
    seller_id: { // Adding the foreign key field
      type: DataTypes.INTEGER,
      references: {
        model: 'Sellers', // The table we are referencing
        key: 'id', // The column in the Sellers table
      },
      allowNull: false,
    },
  });

  Products.associate = (models) => {
    // Product belongs to a Seller
    Products.belongsTo(models.Sellers, {
      foreignKey: 'seller_id', // foreign key in Products table
    });
  };

  return Products;
};
