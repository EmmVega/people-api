const express = require("express");
// const castingsControllers = require("../controllers/casting-controllers");
const userControllers = require("../controllers/user-controllers");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.login);
router.post("/addCasting", userControllers.addCasting);
router.post("/settings/cv", fileUpload.single("cv"), userControllers.addCv);
// this is how we use the multer middleware. The concrete middleware is actually the result of that 'single' call
// fileUpload is just an object with a bunch of preconfigured middlewares, for example a middleware to retrieve a single file
// which gives access to a single method. The argument is the key of the file in the body request
router.get("/:uId/settings/cv", userControllers.getCv);

module.exports = router;
