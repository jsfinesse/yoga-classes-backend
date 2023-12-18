require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/api", require("./routes"));

// Database synchronization
sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
});
