const dotenv = require("dotenv");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");

class User {
  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword) {
        throw { code: 400, message: "PASSWORD_REQUIRED" };
      }
      if (newPassword.length < 8) {
        throw { code: 400, message: "PASSWORD_MIN_8_CHAR" };
      }
      let oldPasswordDb = await UserModel.getOneUser("id", req.jwt.id);

      const comparePassword = await bcrypt.compareSync(
        oldPassword,
        oldPasswordDb.password
      );

      if (!comparePassword) {
        throw { code: 400, message: "PASSWORD_NOT_MATCH" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatePassword = await UserModel.updatePassword(
        hashedPassword,
        req.jwt.id
      );
      return res.status(200).json({
        status: true,
        message: "PASSWORD_UPDATED",
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let { name, username, email, phone, address } = req.body;
      if (!name) {
        name = await UserModel.getOneUserById("name", req.jwt.id);
      }
      if (!username) {
        username = await UserModel.getOneUserById("username", req.jwt.id);
      }
      let usernameAlreadyExist = await UserModel.getOneUser(
        "username",
        req.body.username
      );
      if (usernameAlreadyExist) {
        throw { code: 400, message: "USERNAME_ALREADY_EXIST" };
      }
      if (!email) {
        email = await UserModel.getOneUserById("email", req.jwt.id);
      }
      let emailAlreadyExist = await UserModel.getOneUser(
        "email",
        req.body.email
      );
      if (emailAlreadyExist) {
        throw { code: 400, message: "EMAIL_ALREADY_EXIST" };
      }
      if (!phone) {
        phone = await UserModel.getOneUserById("phone", req.jwt.id);
      }
      if (req.body.phone.length < 12) {
        throw { code: 400, message: "PHONE_MIN_12_CHAR" };
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
      if (!address) {
        address = await UserModel.getOneUserById("address", req.jwt.id);
      }
      const updateProfile = await UserModel.updateProfile(
        name,
        username,
        email,
        phone,
        address,
        req.jwt.id
      );
      return res.status(200).json({
        status: true,
        message: "UPDATE_PROFILE_SUCCESS",
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
  async getOneUser(req, res) {
    try {
      const getProfile = await UserModel.getOneUser("id", req.jwt.id);
      return res.status(200).json({
        status: true,
        message: "GET_PROFILE_SUCCESS",
        data: getProfile,
      });
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  }
}
module.exports = new User();
