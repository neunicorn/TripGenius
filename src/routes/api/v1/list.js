const express = require("express");
const ListController = require("../../../controllers/list.js");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();

router.get("/", jwtAuth(), ListController.getAllList);
router.get("/detail", jwtAuth(), ListController.getDetailList);
router.post("/", jwtAuth(), ListController.addList);

module.exports = router;
