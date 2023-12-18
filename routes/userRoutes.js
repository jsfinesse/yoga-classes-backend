const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/register", UserController.enrollUser);

module.exports = router;