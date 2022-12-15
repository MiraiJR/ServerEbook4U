const User = require("../models/User.js")

class ImageController {
    async uploadFile(req, res, next) {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Upload file successfully!",
            urlImage: req.file.path
        })
    }

    async uploadAvatar(req, res, next) {
        const userID= req.userID

        try {
            if(!req.file) {
                return res.status(400).json({success: false, message: "No file uploaded!"})
            }

            const user = await User.findOneAndUpdate({
                _id: userID
            }, {
                avatar: req.file.path
            })

            if(!user) {
                return res.status(400).json({success: false, message: "Change avatar failed!"})
            }

            return res.status(200).json({success: true, message: "Change avatar successfully!", data: req.file.path})
        } catch (error) {
            console.log("Error in ImageController: " + error)
            return res.status(500).json({success: false, message: "Internal server error!"})
        }
    }

    async uploadMultiImage(req, res, next) {
        const userID = req.userID
        try {
            console.log(req.files)
        }catch(error) {
            console.log("Error in ImageController: " + error)
            return res.status(500).json({success: false, message: "Internal server error!"})
        }
    }
}

module.exports = new ImageController()