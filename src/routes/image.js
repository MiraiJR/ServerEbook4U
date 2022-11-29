const express = require("express")
const router = express.Router()
const fileUploader = require("../database/CloudinaryConfig.js")

// middleware
const {
    verifyToken
} = require("../middleware/Auth.js")

const imageController = require("../app/controllers/ImageController.js")

router.post("/upload", fileUploader.single("file"), imageController.uploadFile)
router.post("/user/avatar", verifyToken, fileUploader.single("file"), imageController.uploadAvatar)
router.post("/chapter/multi-image", verifyToken, fileUploader.array("file"), imageController.uploadMultiImage)

module.exports = router