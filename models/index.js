const Sequelize = require("sequelize");
const UserModel = require("./User");

const sequelize = new Sequelize(
    "db_name",
    "db_user",
    "db_password",
    {
        host: "localhost",
        dialect: "postgres",
    }
);

const User = UserModel(sequelize, Sequelize);

module.exports = { sequelize, User };