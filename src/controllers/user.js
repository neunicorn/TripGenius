const dotenv = require("dotenv");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");
const env = dotenv.config().parsed;

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
      let OldPasswordDb = await UserModel.getOneUser("id", req.params.id);

      const comparePassword = await bcrypt.compareSync(
        oldPassword,
        OldPasswordDb[0].password
      );

      console.log(comparePassword);

      if (!comparePassword) {
        throw { code: 400, message: "PASSWORD_NOT_MATCH" };
      }
      const updatePassword = await UserModel.updatePassword(
        newPassword,
        req.params.id
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
        name = await UserModel.getOneUserById("name", req.params.id)[0];
      }
      if (!username) {
        username = await UserModel.getOneUserById("username", req.params.id)[0];
      }
      if (!email) {
        email = await UserModel.getOneUserById("email", req.params.id)[0];
      }
      if (!phone) {
        phone = await UserModel.getOneUserById("phone", req.params.id)[0];
      }
      if (!address) {
        address = await UserModel.getOneUserById("address", req.params.id)[0];
      }
      const updateProfile = await UserModel.updateProfile(
        name,
        username,
        email,
        phone,
        address,
        req.params.id
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
