const User = require("../app/models/User.js")
const jwt = require("jsonwebtoken")

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
        console.log("Error in function verifyToken" + error)
        return res.status(403).json({success: false, message: "Invalid token"})
    }
}

const verifyRole = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.userID})
    
        if(!user) {
            return res.status(400).json({success: false, message: "Can't not get this user!"})
        }

        if(user.role == "Admin") {
            next()
        }else {
            return res.status(400).json({success: false, message: "Only the admin can take this action!"})
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({success: false, message: "Something is error!"})
    }


}

module.exports = {
    verifyToken, verifyRole
}