const { User, Transaction, Slot } = require("../models");
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
            const existingUserInCurrentMonth = await Transaction.findOne({
                where: {
                    userID: email,
                    enrollmentMonth: currentMonth,
                },
            });

            if (existingUserInCurrentMonth) {
                return res.status(400).json({
                    error: "User already enrolled in this month. Switch next month.",
                });
            }

            // Create a new user
            const newUser = await User.create({ name, email, age });

            // Fetch the selected slot information
            const selectedSlotInfo = await Slot.findByPk(selectedSlot);
            if (!selectedSlotInfo) {
                return res
                    .status(404)
                    .json({ error: "Selected slot not found." });
            }

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
