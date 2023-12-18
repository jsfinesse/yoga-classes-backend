const { User, Transaction, Slot } = require("../models");
const { Sequelize } = require("sequelize");
const { validationResult } = require("express-validator");

const UserController = {
    enrollUser: async (req, res) => {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, age, selectedSlot } = req.body;

            // Check if the user already enrolled in the current month
            const currentMonth = new Date().toISOString().slice(0, 7); // Format: 'YYYY-MM'
            // Assuming currentMonth is a string like "YYYY-MM"
            const currentMonthInteger = parseInt(
                currentMonth.split("-")[1],
                10
            );

            const existingUserInCurrentMonth = await Transaction.findOne({
                where: Sequelize.where(
                    Sequelize.fn(
                        "EXTRACT",
                        Sequelize.literal(
                            'MONTH FROM "Transaction"."dateoftransaction"'
                        )
                    ),
                    currentMonthInteger
                ),
                userID: email,
            });

            if (existingUserInCurrentMonth) {
                return res.status(400).json({
                    error: "User already enrolled in this month. Switch next month.",
                });
            }

            // Create a new user only if the user doesn't exist else update the user's transaction with new slot
            let existingUser = await User.findOne({ where: { email } });
            let newUser;
            if (existingUser) {
                // Update the user's transaction with new slot
                await Transaction.update(
                    { slotID: selectedSlot },
                    { where: { userID: email } }
                );
            } else {
                // Create a new user
                newUser = await User.create({ name, email, age });
            }

            const slotIdMap = {
                "6-7AM": 1,
                "7-8AM": 2,
                "8-9AM": 3,
                "5-6PM": 4,
            };

            const selectedSlotId = slotIdMap[selectedSlot];

            // Fetch the selected slot information
            const selectedSlotInfo = {
                id: selectedSlotId,
                batch: selectedSlot,
                price: 500,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Create a transaction for the user
            const newTransaction = await Transaction.create({
                amount: selectedSlotInfo.price,
                userID: newUser.email,
                slotID: selectedSlot,
                enrollmentMonth: currentMonth,
            });

            // Mocked CompletePayment function
            const CompletePayment = async ({ user, transaction }) => {
                return { success: true, message: "Payment successful." };
            };

            const paymentResponse = await CompletePayment({
                user: newUser,
                transaction: newTransaction,
            });

            // Handle the payment response
            if (paymentResponse.success) {
                return res.status(200).json({
                    success: true,
                    message: "Registration successful!",
                });
            } else {
                // If payment fails, rollback the transaction and delete the user
                await newTransaction.destroy();
                await newUser.destroy();

                return res
                    .status(500)
                    .json({ error: "Payment failed. Please try again." });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },
};

module.exports = UserController;
