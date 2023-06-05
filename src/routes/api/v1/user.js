const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const multer = require("../../../middleware/multer-multipart");
const ImageHelper = require("../../../helpers/ImageHelper");
const router = express.Router();
const UserController = require("../../../controllers/user.js");

router.get("/", jwtAuth(), UserController.getOneUser);
router.put("/updatePassword/", jwtAuth(), UserController.updatePassword);
router.put(
  "/updateProfile/",
  jwtAuth(),
  multer.single("avatar"),
  ImageHelper.uploadToGCS,
  UserController.updateProfile
);
module.exports = router;
