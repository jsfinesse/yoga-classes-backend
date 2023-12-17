module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      selectedBatch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return User;
  };
  