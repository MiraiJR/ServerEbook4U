const cloudinary = require("cloudinary").v2
const {
    CloudinaryStorage
} = require('multer-storage-cloudinary')
const multer = require("multer")

// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
        folder: "EBook4U"
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadCloud = multer({
    storage
})

module.exports = uploadCloud