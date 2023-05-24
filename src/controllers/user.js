const dotenv = require("dotenv");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");
const env = dotenv.config().parsed;

class User {
  async updatePassword(req, res) {
    try {
      const { oldPassword, newpassword } = req.body;
      if (!oldPassword) {
        throw { code: 400, message: "PASSWORD_REQUIRED" };
      }
      if (newpassword.length < 8) {
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
        newpassword,
        req.params.id
      );
      return res.status(200).json({
        status: true,
        message: "PASSWORD_UPDATED",
      });
    } catch (err) {
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let { name, username, email, phone, address } = req.body;
      if (!name) {
        name = `Select name from user where id = '${req.params.id}'`;
      }
      if (!username) {
        username = `Select username from user where id = '${req.params.id}'`;
      }
      if (!email) {
        email = `Select email from user where id = '${req.params.id}'`;
      }
      if (!phone) {
        phone = `Select phone from user where id = '${req.params.id}'`;
      }
      if (!address) {
        address = `Select address from user where id = '${req.params.id}'`;
      }
      const updateProfile = `
        UPDATE user SET name = '${name}', username = '${username}', email = '${email}', phone = '${phone}', address = '${address}' WHERE id = '${req.params.id}'
        `;
      const result = await db.query(updateProfile);
      return res.status(200).json({
        status: true,
        message: "UPDATE_PROFILE_SUCCESS",
        data: result,
      });
    } catch (err) {
      return res.status(err.code).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new User();
