const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");

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
      const emailAlreadyExist = `
      SELECT * FROM user WHERE email = '${req.body.email}'
      `;
      if (emailAlreadyExist) {
        throw { code: 400, message: "EMAIL_ALREADY_EXIST" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const createdAt = new Date().toISOString;
      // const user = `
      //   INSERT INTO users (name, username, email, password, created_at, updated_at) VALUES(
      //     '${req.body.name}',
      //     '${req.body.username}',
      //     '${req.body.email}',
      //     '${hashedPassword}',
      //     '${createdAt}',
      //     '${updatedAt}'
      //   )
      // `;
      let { name, username, email, password, phone, address } = req.body;
      let user = new models(name, username, email, hashedPassword, phone, address);
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
      const isUserValid = `
        SELECT * FROM user WHERE email = '${email}'
      `;
      if (!isUserValid) {
        throw { code: 404, message: "USER_NOT_FOUND" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        isUserValid.passowrd
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
