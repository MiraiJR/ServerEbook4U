const express = require("express")
const router = express.Router()

const {
    verifyToken,
    verifyRole
} = require("../middleware/Auth.js")

const adminController = require("../app/controllers/AdminController.js")

router.get("/user/:id/:status",verifyToken, verifyRole, adminController.banOrUnbanAccount)

module.exports = router