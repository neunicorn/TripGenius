const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const UserController = require("../../../controllers/user.js");

router.get("/", jwtAuth(), UserController.getOneUser);
router.put("/updatePassword/", jwtAuth(), UserController.updatePassword);
router.put("/updateProfile/", jwtAuth(), UserController.updateProfile);
module.exports = router;
