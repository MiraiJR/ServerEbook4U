const Category = require("../models/Category.js")
const Book = require("../models/Book.js")
const Chapter = require("../models/Chapter.js")
const Comment = require("../models/Comment.js")
const slugify = require("slugify")

class BookController {
    async getAllBook(req, res, next) {
        try {
            const books = await Book.find()

            if (!books) {
                return res.status(400).json({
                    success: false,
                    message: "Can't get all book!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "get all book successfully!",
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

    async createBook(req, res, next) {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded!"
            })
        }

        const {
            name,
            description,
            author,
            category,
            country
        } = req.body

        try {
            const newBook = new Book({
                name,
                description,
                author,
                category,
                country,
                image: req.file.path
            })

            await newBook.save()

            return res.status(200).json({
                success: true,
                message: "create book successfully!",
                data: newBook
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getBookFollowID(req, res, next) {
        const idBook = req.params.id

        try {
            // update view when get api book
            await Book.updateOne({
                _id: idBook
            }, {
                $inc: {
                    view: 1
                }
            })

            const book = await Book.findOne({
                _id: idBook
            }).populate("category").populate("country")

            // get Chapter
            const chapters = await Chapter.find({
                book: idBook
            })

            // get comment 
            const comments = await Comment.find({
                book: idBook
            }).populate("user", ["username", "avatar"]).populate("answer.user", ["username", "avatar"])

            if (!book) {
                return res.status(400).json({
                    success: false,
                    message: "Can't get this book with an unexisted id!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get book with this id successfully!",
                data: {
                    book,
                    chapters,
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

    async getAllBook(req, res, next) {
        try {
            const books = await Book.find()

            return res.status(200).json({
                success: true,
                message: "Get all books successfully!",
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

    async getBooksOfCategory(req, res, next) {
        const idCategory = req.params.id

        try {
            const books = await Book.find({
                category: idCategory
            })

            return res.status(200).json({
                success: true,
                message: "Get books of this category successfully!",
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

    async getBooksOfCountry(req, res, next) {
        const {
            idCountry
        } = req.body
        try {
            const books = await Book.find({
                country: idCountry
            })

            return res.status(200).json({
                success: true,
                message: "get books of this country successfully!",
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

    async getBooksOfAuthor(req, res, next) {
        const {
            idAuthor
        } = req.body

        try {
            const books = await Book.find({
                author: idAuthor
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

    async deleteBook(req, res, next) {
        const idBook = req.params.id

        try {
            // delete book
            await Book.deleteOne({
                _id: idBook
            })

            // delete the chapters of this book
            await Chapter.deleteMany({
                book: idBook
            })

            return res.status(200).json({
                success: true,
                message: "Delete book successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async editBook(req, res, next) {
        try {
            const idBook = req.params.id

            const {
                name,
                description,
                author,
                category,
                country
            } = req.body

            let updateBook

            if (!req.file) {
                updateBook = await Book.findOneAndUpdate({
                    _id: idBook
                }, {
                    $set: {
                        name,
                        description,
                        author,
                        category,
                        country,
                        slug: slugify(name, {
                            replacement: "-",
                            lower: true,
                            trim: true
                        }),
                        updatedAt: Date.now()
                    }
                })
            } else {
                updateBook = await Book.findOneAndUpdate({
                    _id: idBook
                }, {
                    $set: {
                        name,
                        description,
                        author,
                        category,
                        country,
                        slug: slugify(name, {
                            replacement: "-",
                            lower: true,
                            trim: true
                        }),
                        image: req.file.path,
                        updatedAt: Date.now()
                    }
                })
            }

            updateBook = await Book.findOne({
                _id: idBook
            })

            if (!updateBook) {
                return res.status(400).json({
                    success: false,
                    message: "Can't find this book!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "updated book successfully!",
                data: updateBook
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

module.exports = new BookController()