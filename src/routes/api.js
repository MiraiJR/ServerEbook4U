const express = require("express")
const router = express.Router()

const categoryController = require("../app/controllers/CategoryController.js")
const bookController = require("../app/controllers/BookController.js")
const countryController = require("../app/controllers/CountryController.js")
const chapterController = require("../app/controllers/ChapterController.js")
const authorController = require("../app/controllers/AuthorController.js")
const userController = require("../app/controllers/UserController.js")
const commentController = require("../app/controllers/CommentController.js")
const fileUploader = require("../database/CloudinaryConfig.js")

// middleware
const {
    verifyToken, verifyRole
} = require("../middleware/Auth.js")

// interact with category
router.post("/category", categoryController.createCategory)
router.get("/category", categoryController.getAllCategory)
router.put("/category/:id", verifyRole)
router.delete("/category/:id", verifyRole)
router.get("/category/:id", bookController.getBooksOfCategory)

// interact with country
router.post("/country", verifyRole, countryController.createCountry)
router.delete("/country/:id", verifyRole, countryController.deleteCountry)

// interact with author
router.get("/author/:name", authorController.getBooksOfAuthor)

// interact with book 
router.post("/book", verifyToken, fileUploader.single("file"), bookController.createBook)
router.get("/book", bookController.getAllBook)
router.get("/book/:id", bookController.getBookFollowID)
router.delete("/book/:id", verifyToken,bookController.deleteBook)
router.put("/book/:id", verifyToken,bookController.editBook)

// interact with chapter
router.post("/chapter", verifyToken,fileUploader.array("file"), chapterController.createChapter)
router.get("/chapter/:id", chapterController.getChapter)
router.put("/chapter/:id", verifyToken)
router.delete("/chapter/:id", verifyToken)

// interact with user
router.get("/user/all", userController.getAllProfileUser)
router.get("/user/personal", verifyToken, userController.getProfile)
router.put("/user/:id", verifyToken)

// interact with comment 
router.post("/comment", verifyToken, commentController.addNewComment)
router.post("/comment/answer", verifyToken, commentController.addAnswerForComment)

module.exports = router