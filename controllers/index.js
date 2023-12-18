const { User } = require("../models");

const enroll = async (req, res) => {
    try {
        const { name, age, selectedBatch } = req.body;
        const user = await User.create({ name, age, selectedBatch });
        res.json(user);
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { enroll };
