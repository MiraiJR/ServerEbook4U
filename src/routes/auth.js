const express = require("express")
const router = express.Router()

const {
    checkStatusAccount,
    verifyToken,
    verifyRoleAdmin
} = require("../middleware/Auth.js")

const authController = require("../app/controllers/AuthController.js")

router.post("/login", checkStatusAccount, authController.login)
router.post("/register", authController.register)
router.post("/forget-password", authController.forgetPassword)
router.get("/checkadmin", verifyToken, verifyRoleAdmin)

module.exports = router