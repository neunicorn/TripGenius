const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const multer = require("../../../middleware/multer-multipart");
const router = express.Router();
const UserController = require("../../../controllers/user.js");

router.get("/", jwtAuth(), UserController.getOneUser);
router.put(
  "/updateAvatar/",
  jwtAuth(),
  multer.single("image"),
  UserController.updateAvatar
);
router.put("/updatePassword/", jwtAuth(), UserController.updatePassword);
router.put("/updateProfile/", jwtAuth(), UserController.updateProfile);
module.exports = router;
