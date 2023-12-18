const express = require("express");
const router = express.Router();
const { enroll } = require("../controllers");

router.post("/enroll", enroll);

module.exports = router;
