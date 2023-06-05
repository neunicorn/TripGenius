const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const DataController = require("../../../controllers/data.js");

router.get("/getAllDestination", jwtAuth(), DataController.getDestination);
router.get("/getAllHotel", jwtAuth(), DataController.getHotel);
router.get("/getAllRestaurant", jwtAuth(), DataController.getRestaurant);
router.get("/getDetailHotel", jwtAuth(), DataController.getDetailHotel);
router.get("/getDetailRestaurant", jwtAuth(), DataController.getDetailRestaurant);
router.get("/getDetailDestination", jwtAuth(), DataController.getDetailDestination);

module.exports = router;