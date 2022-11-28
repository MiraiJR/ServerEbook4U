const User = require("../models/User.js")
const Book = require("../models/Book.js")
const Category = require("../models/Category.js")

class UserController {
    async editProfile(req, res, next) {
        
    }

    async getProfile(req, res, next) {
        try {
            const user = await User.findOne({
                _id: req.userID
            })

            if(!user) {
                return res.status(400).json({success: false, message: "User doesn't exist!"})
            }

            // all goood
            return res.status(200).json({success: true, message: "Get profile of this user successfully!", data: user})
        } catch (error) {
            console.log("Error in UserController: " + error)
            return res.status(500).json({success: false, message: "Internal server error!"})
        }        
    }
}

module.exports = new UserController()