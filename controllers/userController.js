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

            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ error: "User with this email already exists." });
            }

            // Create a new user
            const newUser = await User.create({ name, email, age });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },
};

module.exports = UserController;
