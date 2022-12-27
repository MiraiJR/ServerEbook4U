const User = require("../models/User.js")

class UserController {
    async editProfile(req, res, next) {
        const idUser = req.userID
        
        const {
            fullname,
            phone,
            email,
            address,
            dateOfBirth
        } = req.body

        try {
            let user = await User.findOne({
                _id: idUser
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Can't find this user!"
                })
            }

            user = user.toObject();

            user.fullname = fullname;
            user.phone = phone;
            user.email = email;
            user.dateOfBirth = dateOfBirth;
            user.address = address;

            delete user.role
            delete user._id
            delete user.username
            delete user.password
            delete user.avatar
            delete user.__v

            await User.updateOne({
                _id: idUser
            }, {
                $set: user
            })

            return res.status(200).json({
                success: true,
                message: "Update profile successfully!",
                data: user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getProfile(req, res, next) {
        try {
            let user = await User.findOne({
                _id: req.userID
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User doesn't exist!"
                })
            }

            user = user.toObject()

            delete user._id
            delete user.username
            delete user.password
            delete user.__v

            // all goood
            return res.status(200).json({
                success: true,
                message: "Get profile of this user successfully!",
                data: user
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
            // const users = await User.find()
            const users = await User.aggregate([{
                    "$match": {
                        "role": {
                            "$ne": "Admin"
                        }
                    }
                },
                {
                    $project: {
                        username: 1,
                        fullname: 1,
                        phone: 1,
                        email: 1,
                        dateOfBirth: 1,
                        address: 1,
                        avatar: 1,
                        role: 1,
                        status: 1,
                        _id: 1
                    }
                }
            ])



            if (!users) {
                return res.status(400).json({
                    success: false,
                    message: "User doesn't exist!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get all profile user successfully!",
                data: users
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async changeAvatar(req, res, next) {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded!"
            })
        }

        const idUser = req.userID

        try {
            const user = await User.findOneAndUpdate({
                _id: idUser
            }, {
                "avatar": req.file.path
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Can't find this user!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Change avatar for this user successfully!",
                data: req.file.path
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