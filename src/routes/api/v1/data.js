const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const DataController = require("../../../controllers/data.js");

router.get("/getDestination", DataController.getDestination);
router.get("/getHotel", DataController.getHotel);
router.get("/getRestaurant", DataController.getRestaurant);
module.exports = router;