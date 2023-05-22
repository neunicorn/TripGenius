const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");

const env = dotenv.config().parsed;

const generateAccesToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
    },
    env.ACCESS_JWT_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
    },
    env.REFRESH_JWT_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
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
      const createdAt = new Date().toISOString;
      const emailAlreadyExist = `
        SELECT * FROM users WHERE email = '${req.body.email}'
      `;
      if (emailAlreadyExist) {
        throw { code: 409, message: "EMAIL_ALREADY_EXIST" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = `
        INSERT INTO users (name, username, email, password, created_at, updated_at) VALUES(
          '${req.body.name}',
          '${req.body.username}',
          '${req.body.email}',
          '${hashedPassword}',
          '${createdAt}',
          '${updatedAt}'
        )
      `;
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
    } catch (err) {
      return res.status(err.code || 500).json({
        status: false,
        code: err.code,
        message: err.message,
      });
    }
  }
  async refreshToken(req, res) {}
}

module.exports = new AuthController();
