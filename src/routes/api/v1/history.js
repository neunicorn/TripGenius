const express = require("express");
const HistoryController = require("../../../controllers/history.js");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();

router.get("/", jwtAuth(), HistoryController.getAllHistory);
router.put("/", jwtAuth(), HistoryController.addToHistory);

module.exports = router;
