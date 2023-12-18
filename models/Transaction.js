module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        transactionsID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        dateoftransaction: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 500,
            allowNull: false,
        },
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: "userID" });
        Transaction.belongsTo(models.Slot, { foreignKey: "slotID" });
    };

    return Transaction;
};
