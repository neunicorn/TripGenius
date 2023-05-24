const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const UserController = require("../../../controllers/user.js");

//saat lu bikin route, user harus cek apakah dia punya token atau tidak
// jadi dipakai middleware jwtAuth
//router.put("/update", jwtAuth(), (req, res) => {

router.put("/updatePassword/:id", jwtAuth(), UserController.updatePassword);
router.put("/updateProfile/:id", jwtAuth(), UserController.updateProfile);
module.exports = router;