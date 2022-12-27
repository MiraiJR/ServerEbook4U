const express = require("express")
const router = express.Router()

const {
    verifyToken,
    verifyRole
} = require("../middleware/Auth.js")

const adminController = require("../app/controllers/AdminController.js")
const reportController = require("../app/controllers/ReportController.js")
const notifyController = require("../app/controllers/NotifyController.js")
const commentController = require("../app/controllers/CommentController.js")

router.put("/user/:id/:status", verifyToken, verifyRole, adminController.banOrUnbanAccount)

// interact with report
router.get("/report/all", verifyToken, verifyRole, reportController.getAllReport)

// interact with notify
router.get("/notify", verifyToken, verifyRole, notifyController.getNotificationOfUser)
router.put("/notify/:id", verifyToken, notifyController.changeStatus)
router.get("/notify/count", verifyToken, verifyRole, notifyController.countNotificationWithStatusFalse)

// interact with comment
router.delete("/comment/:id", verifyToken, verifyRole, commentController.adminDeleteComment)

module.exports = router