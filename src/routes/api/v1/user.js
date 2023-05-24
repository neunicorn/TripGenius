const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const UserController = require("../../../controllers/user.js");

router.put("/updatePassword/:id", jwtAuth(), UserController.updatePassword);
router.put("/updateProfile/:id", jwtAuth(), UserController.updateProfile);
module.exports = router;
