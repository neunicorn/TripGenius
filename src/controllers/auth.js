const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const UserModel = require("../models/UserModel.js");

const generateAccesToken = async (payload) => {
  return jwt.sign(
    {
      id: payload,
    },
    process.env.ACCESS_JWT_TOKEN_SECRET
  );
};

class AuthController {
  async register(req, res) {
    try {
      if (validator.isEmail(req.body.email) === false) {
        throw { code: 400, message: "EMAIL_INVALID" };
      }
      let emailAlreadyExist = await UserModel.getOneUser(
        "email",
        req.body.email
      );
      let usernameAlreadyExist = await UserModel.getOneUser(
        "username",
        req.body.username
      );
      if (usernameAlreadyExist) {
        throw { code: 400, message: "USERNAME_ALREADY_EXIST" };
      }
      if (emailAlreadyExist) {
        throw { code: 400, message: "EMAIL_ALREADY_EXIST" };
      }
      let phoneNumberAlreadyExist = await UserModel.getOneUser(
        "phone",
        req.body.phone
      );
      if (phoneNumberAlreadyExist) {
        throw { code: 400, message: "PHONE_ALREADY_EXIST" };
      }
      function validatePhoneNumber(phoneNumber) {
        const cleanedNumber = phoneNumber.replace(/\D/g, "");
        if (!validator.isMobilePhone(cleanedNumber, "id-ID")) {
          return false;
        }
        return true;
      }
      if (!validatePhoneNumber(req.body.phone)) {
        throw { code: 400, message: "PHONE_INVALID" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      let { name, username, email, phone, home_town } = req.body;
      let user = new UserModel(
        name,
        username,
        email,
        hashedPassword,
        phone,
        home_town
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
      console.log(err);
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const isUserValid = await UserModel.getOneUser("email", email);
      console.log(isUserValid);
      if (!isUserValid) {
        throw { code: 404, message: "USER_NOT_FOUND" };
      }

      const isPasswordValid = await bcrypt.compareSync(
        password,
        isUserValid.password
      );
      if (!isPasswordValid) {
        throw { code: 400, message: "PASSWORD_INVALID" };
      }

      const accessToken = await generateAccesToken(isUserValid.id);

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
