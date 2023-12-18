module.exports = (sequelize, DataTypes) => {
    const Slot = sequelize.define("Slot", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        batch: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 500,
            allowNull: false,
        },
    });

    Slot.associate = (models) => {
        Slot.hasMany(models.Transaction, { foreignKey: "slotID" });
    };

    return Slot;
};
