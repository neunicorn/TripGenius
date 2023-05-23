const express = require("express");
const jwtAuth = require("../../../middleware/jwtAuth");
const router = express.Router();

//saat lu bikin route, user harus cek apakah dia punya token atau tidak
// jadi dipakai middleware jwtAuth
//router.put("/update", jwtAuth(), (req, res) => {
