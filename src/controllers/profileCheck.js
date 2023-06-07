const userModel = require("../models/UserModel.js");

class ProfileCheck {

    async profileCheck(req, res) {
        try{
            const {age,location} = req.body;
            const id = req.jwt.id;

            const result = await userModel.profileCheck(age,location,id);
            return res.status(200).json({
                status: true,
                message: "Profile Check Success",
                data: result,
            });
        }catch (err) {
            console.log(err);
            return res.status(err.code || 500).json({
            status: false,
            message: err.message,
        });
        }
    }
}
module.exports = new ProfileCheck();