const dotenv = require("dotenv");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");
const env = dotenv.config().parsed;

class User {
  async updatePassword(req, res) {
    try {
      console.log(req.jwt);
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

      console.log(comparePassword);

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
      if (!email) {
        email = await UserModel.getOneUserById("email", req.jwt.id);
      }
      if (!phone) {
        phone = await UserModel.getOneUserById("phone", req.jwt.id);
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
}

module.exports = new User();
