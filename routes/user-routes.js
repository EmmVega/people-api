const express = require("express");
// const castingsControllers = require("../controllers/casting-controllers");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.login);

module.exports = router;
