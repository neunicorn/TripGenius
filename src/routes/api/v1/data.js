const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const DataController = require("../../../controllers/data.js");

router.get("/getDestination", jwtAuth(), DataController.getDestination);
router.get("/getHotel", jwtAuth(), DataController.getHotel);
router.get("/getRestaurant", jwtAuth(), DataController.getRestaurant);
module.exports = router;
