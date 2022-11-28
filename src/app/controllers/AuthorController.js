const User = require("../models/User.js")
const Book = require("../models/Book.js")

class AuthorController {
    async getBooksOfAuthor(req, res, next) {
        const author = req.params.name

        try {
            const books = await Book.find({
                author
            })

            return res.status(200).json({
                success: true,
                message: "get books of this author successfully!",
                data: books
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

module.exports = new AuthorController()