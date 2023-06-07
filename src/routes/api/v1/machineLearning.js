const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const MachineLearningController = require("../../../controllers/machinleLearning.js");

// router.post("/", jwtAuth(), MachineLearningController.machineLearning);

module.exports = router;