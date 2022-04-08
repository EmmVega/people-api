const express = require("express");
const castingsControllers = require("../controllers/casting-controllers");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/", castingsControllers.getAllCastings);
router.get("/castings/", castingsControllers.getFilteredCastings);
router.get("/castings/:cid", castingsControllers.getCastingDataById);
router.use(checkAuth);
router.get("/castings/board/:uid", castingsControllers.getCastingsByUserId);

module.exports = router;
