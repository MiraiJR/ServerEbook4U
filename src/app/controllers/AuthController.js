const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const hashLength = 64

class AuthController {
    async login(req, res, next) {
        try {
            const {
                username,
                password
            } = req.body

            // check validation

            // check username existed
            const user = await User.findOne({
                username
            })

            if (!user) {
                return res.status(200).json({
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
                return res.status(200).json({
                    success: false,
                    message: "Username or password don't correct!"
                })
            }

            //all good 
            // accessToken to authencate
            const accessToken = jwt.sign({userID: user._id}, process.env.ACCESS_TOKEN_SECRET)

            req.session.user = username

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
                password
            } = req.body

            // check validation

            // check username existed
            const isExisted = await User.findOne({
                username
            })

            if (isExisted) {
                console.log("zo")
                return res.status(200).json({
                    success: false,
                    message: "Username is used! Please using another one!"
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
                password: pwEncrypt
            })

            await newUser.save()

            // generate token 
            // const accessToken = jwt.

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
        return res.status(200).json({success: true, message: "logout successfully!"})
    }
}

module.exports = new AuthController()