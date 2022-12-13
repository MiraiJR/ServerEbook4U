const User = require("../models/User.js")
const Book = require("../models/Book.js")
const Category = require("../models/Category.js")
const {
    ObjectID
} = require("bson")

class UserController {
    async editProfile(req, res, next) {

    }

    async getProfile(req, res, next) {
        try {
            const user = await User.findOne({
                _id: req.userID
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User doesn't exist!"
                })
            }

            let tempUser = {}
            tempUser.role = i.role
            tempUser.username = i.username
            tempUser.fullname = i.fullname
            tempUser.phone = i.phone
            tempUser.email = i.email
            tempUser.dateOfBirth = i.dateOfBirth
            tempUser.address = i.address
            tempUser.avatar = i.avatar

            // all goood
            return res.status(200).json({
                success: true,
                message: "Get profile of this user successfully!",
                data: tempUser
            })
        } catch (error) {
            console.log("Error in UserController: " + error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getAllProfileUser(req, res, next) {
        try {
            let result = []

            let users = await User.find()

            if (!users) {
                return res.status(400).json({
                    success: false,
                    message: "User doesn't exist!"
                })
            }

            // delete password
            for (let i of users) {
                let tempUser = {}
                tempUser.role = i.role
                tempUser.username = i.username
                tempUser.fullname = i.fullname
                tempUser.phone = i.phone
                tempUser.email = i.email
                tempUser.dateOfBirth = i.dateOfBirth
                tempUser.address = i.address
                tempUser.avatar = i.avatar
                result.push(tempUser)
            }

            return res.status(200).json({
                success: true,
                message: "Get all profile user successfully!",
                data: result
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }
}

module.exports = new UserController()