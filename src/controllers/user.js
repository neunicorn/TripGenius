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
    async updateProfile(req, res){
      try{
        const {name, username, email, phone, address} = req.body;
        if(!name){
          name = `Select name from user where id = '${req.params.id}'`
        }
        if(!username){
          username = `Select username from user where id = '${req.params.id}'`
        }
        if(!email){
            email = `Select email from user where id = '${req.params.id}'`
        }
        if(!phone){
          phone = `Select phone from user where id = '${req.params.id}'`
        }
        if(!address){
          address = `Select address from user where id = '${req.params.id}'`
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
      }catch(err){
        return res.status(err.code).json({
          status: false,
          message: err.message,
        });
      }
    }

}

module.exports = new User();
