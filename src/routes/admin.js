const express = require("express")
const router = express.Router()

const {
    verifyToken,
    verifyRole
} = require("../middleware/Auth.js")

const adminController = require("../app/controllers/AdminController.js")
const reportController = require("../app/controllers/ReportController.js")
const notifyController = require("../app/controllers/NotifyController.js")

router.get("/user/:id/:status", verifyToken, verifyRole, adminController.banOrUnbanAccount)

// interact with report
router.get("/report/all", verifyToken, verifyRole, reportController.getAllReport)

// interact with notify
router.get("/notify", verifyToken, verifyRole, notifyController.getNotificationOfUser)

module.exports = router