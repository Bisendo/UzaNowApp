module.exports = (Sequelize, dataTypes) => {
  const Users = Sequelize.define("Users", {
    username: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });
  return Users;
};
