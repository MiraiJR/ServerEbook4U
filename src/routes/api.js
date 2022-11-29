const express = require("express")
const router = express.Router()

const categoryController = require("../app/controllers/CategoryController.js")
const bookController = require("../app/controllers/BookController.js")
const countryController = require("../app/controllers/CountryController.js")
const chapterController = require("../app/controllers/ChapterController.js")
const authorController = require("../app/controllers/AuthorController.js")
const userController = require("../app/controllers/UserController.js")
const commentController = require("../app/controllers/CommentController.js")

// middleware
const {
    verifyToken
} = require("../middleware/Auth.js")

// interact with category
router.post("/category", categoryController.createCategory)
router.get("/category", categoryController.getAllCategory)
router.put("/category")
router.delete("/category")
router.get("/category/:id", bookController.getBooksOfCategory)

// interact with country
router.post("/country", countryController.createCountry)

// interact with author
router.get("/author/:name", authorController.getBooksOfAuthor)

// interact with book 
router.post("/book", bookController.createBook)
router.get("/book")
router.get("/book/:id", bookController.getBookFollowID)

// interact with chapter
router.post("/chapter", chapterController.createChapter)

// interact with user
router.get("/user", verifyToken, userController.getProfile)

// interact with comment 
router.post("/comment", verifyToken, commentController.addNewComment)
router.post("/comment/answer", verifyToken, commentController.addAnswerForComment)

module.exports = router