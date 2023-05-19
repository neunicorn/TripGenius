const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

class AuthController {
  async register(req, res) {}
  async login(req, res) {}
  async refreshToken(req, res) {}
}

module.exports = new AuthController();
