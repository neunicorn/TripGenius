const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const profileCheckController = require("../../../controllers/profileCheck.js");

router.post("/", jwtAuth(), profileCheckController.profileCheck);

module.exports = router;