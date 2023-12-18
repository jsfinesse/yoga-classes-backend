const express = require("express");
const router = express.Router();
const { submitForm } = require("../controllers");

router.post("/enroll", submitForm);

module.exports = router;
