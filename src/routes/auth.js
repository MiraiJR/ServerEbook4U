const express = require("express")
const router = express.Router()

const {
    checkStatusAccount
} = require("../middleware/Auth.js")

const authController = require("../app/controllers/AuthController.js")

router.post("/login", checkStatusAccount, authController.login)
router.post("/register", authController.register)

module.exports = router