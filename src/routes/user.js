const express = require("express")
const router = express.Router()

const userController = require("../app/controllers/UserController.js")
const favoriteController = require("../app/controllers/FavoriteController.js")
const reportController = require("../app/controllers/ReportController.js")
const notifyController = require("../app/controllers/NotifyController.js")
const historyController = require("../app/controllers/HistoryController.js")
const commentController = require("../app/controllers/CommentController.js")

const {
    verifyToken
} = require("../middleware/Auth.js")

const upload = require("../database/CloudinaryConfig.js")

// interact with profile
router.get("/me", verifyToken, userController.getProfile)
router.put("/me", verifyToken, upload.single("file"), userController.editProfile)

// interact with favoritebook
router.get("/me/favorite-book", verifyToken, favoriteController.getFavoriteList)
router.post("/me/favorite-book", verifyToken, favoriteController.addBookToFavoriteList)
router.delete("/me/favorite-book", verifyToken, favoriteController.removeBookFromFavoriteList)

// interact with report
router.post("/me/report/:type/:object", verifyToken, reportController.createReport)

// interact with notify
router.get("/me/notify", verifyToken, notifyController.getNotificationOfUser)
router.get("/me/notify/count", verifyToken, notifyController.countNotificationWithStatusFalse)
router.put("/me/notify/:id", verifyToken, notifyController.changeStatus)

// interact with history
router.get("/me/history", verifyToken, historyController.getHistoryBook)
router.post("/me/history", verifyToken, historyController.addBookToHistory)
router.delete("/me/history", verifyToken, historyController.removeBookFromHistory)

// interact with comment
router.post("/comment/:id", verifyToken, commentController.addNewComment)
router.post("/comment/answer", verifyToken, commentController.addAnswerForComment)
router.delete("/comment/:id", verifyToken, commentController.deleteComment)

module.exports = router