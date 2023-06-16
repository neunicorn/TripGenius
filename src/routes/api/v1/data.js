const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();
const DataController = require("../../../controllers/data.js");

router.get("/allDestination/:page", jwtAuth(), DataController.getDestination);
router.get("/allHotel/:page", jwtAuth(), DataController.getHotel);
router.get("/allRestaurant/:page", jwtAuth(), DataController.getRestaurant);
router.get("/hotel/:id", jwtAuth(), DataController.getDetailHotel);
router.get("/restaurant/:id", jwtAuth(), DataController.getDetailRestaurant);
router.get("/destination/:id", jwtAuth(), DataController.getDetailDestination);

module.exports = router;