const express = require("express");
const castingsControllers = require("../controllers/casting-controllers");

const router = express.Router();

router.get("/", castingsControllers.getAllCastings);
router.get("/castings/", castingsControllers.getFilteredCastings);
router.get("/castings/:cid", castingsControllers.getCastingDataById);

module.exports = router;
