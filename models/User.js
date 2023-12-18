module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: true,
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 18,
                max: 65,
            },
        },
    });

    return User;
};
