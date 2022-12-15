const User = require("../models/User.js")

class AdminController {
    async banOrUnbanAccount(req, res, next) {
        const idUser = req.params.id
        const status = req.params.status

        try {
            
            const user = await User.findOneAndUpdate({
                _id: idUser
            }, {
                status
            })

            if(!user) {
                return res.status(400).json({success: false, message: "Can't find this user!"})
            }

            if(status == "banned") {
                return res.status(200).json({success: true, message: "Banned the account successfully!"})
            }else {
                return res.status(200).json({success: true, message: "Unbanned the account successfully!"})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Internal server error!"})
        }
    }
}

module.exports = new AdminController()