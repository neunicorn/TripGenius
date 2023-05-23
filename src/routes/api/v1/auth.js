const express = require("express");
const AuthController = require("../../../controllers/auth.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "hello auth!" });
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
