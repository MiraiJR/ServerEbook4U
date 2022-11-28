const Category = require("../models/Category.js")
const Book = require("../models/Book.js")
const Chapter = require("../models/Chapter.js")
const {
    convert
} = require('html-to-text');

class ChapterController {
    async createChapter(req, res, next) {
        const {
            name,
            idBook,
            contentText
        } = req.body

        try {
            const newChapter = new Chapter({
                name,
                book: idBook,
                contentText
            })

            await newChapter.save()

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
}

module.exports = new ChapterController()