const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const hashLength = 64
const nodemailer = require("../configs/nodemailer.js")

class AuthController {
    async login(req, res, next) {
        try {
            const idUser = req.userID
            const {
                password
            } = req.body

            // check validation

            // check username existed
            const user = await User.findOne({
                _id: idUser
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password don't correct!"
                })
            }

            const salt = user.password.slice(hashLength)
            const pwSalt = password + salt
            const pwHashed = CryptoJS.SHA3(pwSalt, {
                outputLength: hashLength * 4
            }).toString(CryptoJS.enc.Hex)
            const pwEncrypt = pwHashed + salt

            if (user.password != pwEncrypt) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password don't correct!"
                })
            }

            //all good 
            // accessToken to authencate
            const accessToken = jwt.sign({
                userID: user._id
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d'
            })

            if (user.role == "Admin") {
                return res.status(200).json({
                    success: true,
                    message: "Login successfully!",
                    accessToken,
                    admin: true
                })
            }

            return res.status(200).json({
                success: true,
                message: "Login successfully!",
                accessToken
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async register(req, res, next) {
        try {
            const {
                username,
                password,
                email,
                retypePassword,
                fullname,
                dateOfBirth
            } = req.body

            // check validation
            if (password != retypePassword) {
                return res.status(400).json({
                    success: false,
                    message: "Retype password don't match!"
                })
            }

            // check username existed
            let isExisted = await User.findOne({
                username
            })

            if (isExisted) {
                return res.status(400).json({
                    success: false,
                    message: "Username is used! Please using another one!"
                })
            }

            isExisted = await User.findOne({
                email
            })

            if (isExisted) {
                return res.status(400).json({
                    success: false,
                    message: "Email is used! Please using anothor one!"
                })
            }

            // all good ----------
            // encrypt password
            const salt = Date.now().toString(16)
            const pwSalt = password + salt
            const pwHashed = CryptoJS.SHA3(pwSalt, {
                outputLength: hashLength * 4
            }).toString(CryptoJS.enc.Hex)
            const pwEncrypt = pwHashed + salt

            // create newUser and add to database
            const newUser = new User({
                username,
                password: pwEncrypt,
                email,
                fullname,
                dateOfBirth
            })

            await newUser.save()

            return res.status(200).json({
                success: true,
                message: "Create new user successgfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async logout(req, res, next) {
        req.session.user = ""
        return res.status(200).json({
            success: true,
            message: "logout successfully!"
        })
    }

    async forgetPassword(req, res, next) {
        try {
            const {
                information
            } = req.body

            let curUser

            curUser = await User.findOne({
                username: information
            })

            if (!curUser) {
                curUser = await User.findOne({
                    email: information
                })
            }

            if (!curUser) {
                return res.status(400).json({
                    success: false,
                    message: "Acount don't exist!"
                })
            }

            const salt = Date.now().toString(16)
            const pwSalt = "123" + salt
            const pwHashed = CryptoJS.SHA3(pwSalt, {
                outputLength: hashLength * 4
            }).toString(CryptoJS.enc.Hex)
            const pwEncrypt = pwHashed + salt

            var objectMail = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Admin EBook4U <no:reply>',
                to: `${curUser.email}`,
                subject: `RESET PASSWORD USERNAME: ${curUser.username}`,
                html: `<div>Hello ${curUser.username},</div>
                        <div>Password reset: <strong>"123"</strong></div>
                        <div>Please remember this password to login my website</div>
                        <div>Thank for using my website. </div>
                        `
            }

            nodemailer.sendMail(objectMail, async (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    await User.updateOne({
                        _id: curUser._id
                    }, {
                        $set: {
                            password: pwEncrypt
                        }
                    })

                    return res.status(200).json({
                        success: true,
                        message: "Mail is sent. Please Check mail to get new password!"
                    })
                }
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

module.exports = new AuthController()