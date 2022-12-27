const Category = require("../models/Category.js")
const Comment = require("../models/Comment.js")
const Book = require("../models/Book.js")
const Chapter = require("../models/Chapter.js")
const {
    convert
} = require('html-to-text');
const {
    pushNotification
} = require("../../middleware/helper.js")

class ChapterController {
    async createChapter(req, res, next) {
        try {
            let contentImage = []
            const idBook = req.params.id

            const {
                name,
                contentText
            } = req.body

            if (req.files) {
                for (let i of req.files) {
                    contentImage.push(i.path)
                }
            }

            const newChapter = new Chapter({
                name,
                book: idBook,
                contentText: contentText || "",
                contentImage
            })

            await newChapter.save()

            const book = await Book.findOne({
                _id: idBook
            })

            // Notify to the users who favorite this book
            const contentNotify = `Sách "${book.name}" vừa cập nhật thêm chương mới là "${name}". Đọc ngay nào!`
            await pushNotification(contentNotify, "books", idBook)

            return res.status(200).json({
                success: true,
                message: "Create chapter successfully!",
                data: newChapter
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getChapter(req, res, next) {
        const idChapter = req.params.id

        try {
            const chapter = await Chapter.findOne({
                _id: idChapter
            })

            const comments = await Comment.find({
                book: chapter.book
            }).populate("user", ["username", "avatar"]).populate("answer.user", ["username", "avatar"])

            if (!chapter) {
                return res.status(400).json({
                    success: false,
                    message: "Can't get this chapter!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "get chapter successfully!",
                data: {
                    chapter,
                    comments
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }
}

module.exports = new ChapterController()