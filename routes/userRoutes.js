const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/enroll", UserController.enrollUser);

module.exports = router;