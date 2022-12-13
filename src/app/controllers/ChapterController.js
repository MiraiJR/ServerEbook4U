const Category = require("../models/Category.js")
const Book = require("../models/Book.js")
const Chapter = require("../models/Chapter.js")
const {
    convert
} = require('html-to-text');

class ChapterController {
    async createChapter(req, res, next) {
        let contentImage = []

        const {
            name,
            idBook,
            contentText
        } = req.body

        if(req.files) {
            for(let i of req.files) {
                contentImage.push(i.path)
            }
        }

        try {
            const newChapter = new Chapter({
                name,
                book: idBook,
                contentText: contentText || "",
                contentImage
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

    async getChapter(req, res, next) {
        const idChapter = req.params.id

        try {
            const chapter = await Chapter.findOne({
                _id: idChapter
            })

            if(!chapter) {
                return res.status(400).json({success: false, message: "Can't get this chapter!"})
            }

            return res.status(200).json({success: true, message: "get chapter successfully!", data: chapter})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: "Internal server error!"})
        }
    }
}

module.exports = new ChapterController()