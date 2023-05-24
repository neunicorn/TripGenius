const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");
const UserModel = require("../models/UserModel.js");

const env = dotenv.config().parsed;

const generateAccesToken = (payload) => {
  return jwt.sign(
    {
      id: payload,
    },
    env.ACCESS_JWT_TOKEN_SECRET
  );
};

class AuthController {
  async register(req, res) {
    try {
      if (!req.body.name) {
        throw { code: 400, message: "NAME_REQUIRED" };
      }
      if (!req.body.username) {
        throw { code: 400, message: "USERNAME_REQUIRED" };
      }
      if (!req.body.email) {
        throw { code: 400, message: "EMAIL_REQUIRED" };
      }
      if (validator.isEmail(req.body.email) === false) {
        throw { code: 400, message: "EMAIL_INVALID" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "PASSWORD_REQUIRED" };
      }
      if (req.body.password.length < 8) {
        throw { code: 400, message: "PASSWORD_MIN_8_CHAR" };
      }
      let emailAlreadyExist = await UserModel.getOneUser(
        "email",
        req.body.email
      );
      let usernameAlreadyExist = await UserModel.getOneUser(
        "username",
        req.body.username
      );
      if (emailAlreadyExist.length > 0) {
        throw { code: 400, message: "EMAIL_ALREADY_EXIST" };
      }
      if (usernameAlreadyExist.length > 0) {
        throw { code: 400, message: "USERNAME_ALREADY_EXIST" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const createdAt = new Date().toISOString;

      let { name, username, email, phone, address } = req.body;
      let user = new UserModel(
        name,
        username,
        email,
        hashedPassword,
        phone,
        address
      );
      user = await user.save();
      if (!user) {
        throw { code: 500, message: "INTERNAL_SERVER_ERROR" };
      }
      return res.status(201).json({
        status: true,
        message: "REGISTER_SUCCESS",
      });
    } catch (err) {
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { code: 400, message: "EMAIL_REQUIRED" };
      }
      if (!password) {
        throw { code: 400, message: "PASSWORD_REQUIRED" };
      }
      const isUserValid = await UserModel.getOneUser("email", email);
      if (isUserValid.length === 0) {
        throw { code: 404, message: "USER_NOT_FOUND" };
      }
      console.log(isUserValid[0]);

      const isPasswordValid = await bcrypt.compareSync(
        password,
        isUserValid[0].password
      );
      if (!isPasswordValid) {
        throw { code: 400, message: "PASSWORD_INVALID" };
      }

      const accessToken = await generateAccesToken(isUserValid[0].id);

      return res.status(200).json({
        status: true,
        message: "LOGIN_SUCCESS",
        name: isUserValid.name,
        username: isUserValid.username,
        email: isUserValid.email,
        accessToken,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        code: err.code,
        message: err.message,
      });
    }
  }
}

module.exports = new AuthController();
