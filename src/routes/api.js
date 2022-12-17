const express = require("express")
const router = express.Router()

const categoryController = require("../app/controllers/CategoryController.js")
const bookController = require("../app/controllers/BookController.js")
const countryController = require("../app/controllers/CountryController.js")
const chapterController = require("../app/controllers/ChapterController.js")
const authorController = require("../app/controllers/AuthorController.js")
const userController = require("../app/controllers/UserController.js")
const commentController = require("../app/controllers/CommentController.js")
const reportController = require("../app/controllers/ReportController.js")
const fileUploader = require("../database/CloudinaryConfig.js")

// middleware
const {
    verifyToken,
    verifyRole
} = require("../middleware/Auth.js")

// interact with category
router.post("/category", verifyToken, categoryController.createCategory)
router.get("/category/all", categoryController.getAllCategory)
router.put("/category/:id", verifyToken, verifyRole)
router.delete("/category/:id", verifyToken, verifyRole)
router.get("/category/:id", bookController.getBooksOfCategory)

// interact with country
router.post("/country/all")
router.post("/country", verifyToken, verifyRole, countryController.createCountry)
router.delete("/country/:id", verifyToken, verifyRole, countryController.deleteCountry)
router.get("/country/:id")

// interact with author
router.get("/author/:name", authorController.getBooksOfAuthor)

// interact with book 
router.post("/book", verifyToken, verifyRole, fileUploader.single("file"), bookController.createBook)
router.get("/book/all", bookController.getAllBook)
router.get("/book/:id", bookController.getBookFollowID)
router.delete("/book/:id", verifyToken, verifyRole, bookController.deleteBook)
router.put("/book/:id", verifyToken, verifyRole, bookController.editBook)

// interact with chapter
router.post("/chapter", verifyToken, verifyRole, fileUploader.array("file"), chapterController.createChapter)
router.get("/chapter/:id", chapterController.getChapter)
router.put("/chapter/:id", verifyToken, verifyRole)
router.delete("/chapter/:id", verifyToken, verifyRole)

// interact with user
router.get("/user/all", userController.getAllProfileUser)
// router.post("/user/checking", verifyToken, userController.editProfile)

// interact with comment 
router.post("/comment", verifyToken, commentController.addNewComment)
router.post("/comment/answer", verifyToken, commentController.addAnswerForComment)
router.delete("/comment/:id", verifyToken, commentController.deleteComment)

// interact with report
router.get("/report/all", verifyToken, verifyRole, reportController.getAllReport)

module.exports = router