const User = require("../app/models/User.js")
const jwt = require("jsonwebtoken")

// verify accesstoken from client 
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token not found!"
        })
    }

    try {
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.userID = verify.userID
        next()
    } catch (error) {
        // return res.status(403).json({
        //     success: false,
        //     message: "Invalid token"
        // })
        return res.redirect("http://localhost:3000/login")
    }
}

const verifyRoleAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return res.status(200).json({
                success: false, 
                message: "Not found token!"
            })
        }

        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findOne({
            _id: verify.userID
        })

        if (!user) {
            return res.status(200).json({
                success: false,
                message: "Can't not get this user!"
            })
        }

        if (user.role != "Admin") {
            return res.status(200).json({
                success: false,
                message: "User can't access this url!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "This is admin!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

// chekc role of account because in some action, only admin can take action
const verifyRole = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.userID
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Can't not get this user!"
            })
        }

        if (user.role == "Admin") {
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "Only the admin can take this action!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            success: false,
            message: "Something is error!"
        })
    }
}

// check status account if banned, return status 400 else next to conntroller
const checkStatusAccount = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Can't not get this user!"
            })
        }

        if (user.status == "banned") {
            return res.status(400).json({
                success: false,
                message: "The account was banned!"
            })
        } else {
            req.userID = user._id

            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            success: false,
            message: "Something is error!"
        })
    }
}

module.exports = {
    verifyToken,
    verifyRole,
    checkStatusAccount,
    verifyRoleAdmin
}