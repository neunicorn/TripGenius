const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const jwtAuth = () => {
  return async (req, res, next) => {
    try {
      let authorization = req.headers.authorization;
      if (!authorization) {
        throw { code: 401, message: "UNAUTHORIZED" };
      }
      const token = authorization.split(" ")[1];
      console.log(token);
      const decode = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
      req.jwt = decode;
      next();
    } catch (err) {
      const errMessage = [
        "invalid signature",
        "jwt malformed",
        "jwt must be provided",
        "invalid token",
      ];
      if (err.message === "jwt expired") {
        err.message = "TOKEN_EXPIRED";
      } else if (errMessage.includes(err.message)) {
        err.message = "INVALID_TOKEN";
      }
      return res.status(err.code || 500).json({
        status: false,
        message: err.message,
      });
    }
  };
};

module.exports = jwtAuth;
