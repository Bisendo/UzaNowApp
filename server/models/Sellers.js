module.exports = (sequelize, DataTypes) => {
    const Sellers = sequelize.define("Sellers", {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // Default status for new users
        validate: {
          isIn: [['active', 'inactive', 'pending', 'banned', 'suspended']], // Only allows these values
        }
      }
    });



  Sellers.associate = (models) => {
    // Seller has many products
    Sellers.hasMany(models.Products, {
      foreignKey: 'seller_id', // foreign key in Products table
    });
  };
    
    
  
  
    return Sellers;
  };
  