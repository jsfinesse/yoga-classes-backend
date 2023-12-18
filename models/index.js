const Sequelize = require("sequelize");
const UserModel = require("./User");

const urlComponents = new URL(process.env.DATABASE_URL);

const sequelize = new Sequelize({
    dialect: "postgres",
    host: urlComponents.hostname,
    port: urlComponents.port,
    username: urlComponents.username,
    password: urlComponents.password,
    database: urlComponents.pathname.substring(1),
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});

const User = UserModel(sequelize, Sequelize);

module.exports = { sequelize, User };
