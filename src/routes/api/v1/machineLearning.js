const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const MachineLearning = require("../../../controllers/machineLearning.js");

router.get("/destination", jwtAuth(), MachineLearning.getDestinationPredict);
router.get("/restaurant", jwtAuth(), MachineLearning.getRestaurantPredict);

module.exports = router;
