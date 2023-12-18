"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Transactions", {
            transactionsID: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            dateoftransaction: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 500,
            },
            userID: {
                type: Sequelize.STRING, // Adjust the data type based on your User model's primary key type
                references: {
                    model: "Users",
                    key: "email",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            slotID: {
                type: Sequelize.UUID, // Assuming slotID is a UUID
                references: {
                    model: "Slots",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("Transactions");
    },
};
