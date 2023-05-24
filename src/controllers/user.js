const dotenv = require("dotenv");
const validator = require("validator");
const models = require("../models/auth.js");
const env = dotenv.config().parsed;

const generateAccesToken = (payload) => {
  return jwt.sign(
    {
      id: payload,
    },
    env.ACCESS_JWT_TOKEN_SECRET
  );
};

class User{
    async updatePassword(req, res){
        try {
            const {oldPassword, newpassword} = req.body;
            if(!oldPassword){
                throw { code: 400, message: "PASSWORD_REQUIRED" };
            }
            if(newpassword.length < 8){
                throw { code: 400, message: "PASSWORD_MIN_8_CHAR" };
            }
            const OldPasswordDb = `
            SELECT * FROM user WHERE password = '${oldPassword}'
            `;
            const comparePassword = await bcrypt.compare(
              OldPasswordDb,
              oldPassword
            );
            if(!comparePassword){
                throw { code: 400, message: "PASSWORD_NOT_MATCH" };
            }
            const updatePassword = `
            UPDATE user SET password = '${newpassword}' WHERE id = '${req.params.id}'
            `;
            const result = await db.query(updatePassword);
        }catch (err) {
            return res.status(err.code).json({
                status: false,
                message: err.message,
            });
        }
    }
}

module.exports = new User();

const oldPassword = await bcrypt.compare(
  password,
  isUserValid.password
);