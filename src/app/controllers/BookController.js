const Category = require("../models/Category.js")
const Book = require("../models/Book.js")
const Chapter = require("../models/Chapter.js")
const Comment = require("../models/Comment.js")
const slugify = require("slugify")
const fs = require("fs")
const {
    getBooks,
    searchBooks,
    getPer
} = require("../../middleware/HelperQuery.js")

class BookController {
    async getAllBook(req, res, next) {
        try {
            const books = await Book.aggregate([{
                "$lookup": {
                    "from": "categories",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            }, {
                "$lookup": {
                    "from": "countries",
                    "localField": "country",
                    "foreignField": "_id",
                    "as": "country"
                }
            }, {
                "$lookup": {
                    "from": "chapters",
                    "localField": "_id",
                    "foreignField": "book",
                    "as": "numberChapter"
                }
            }, {
                "$set": {
                    "numberChapter": {
                        "$size": "$numberChapter"
                    }
                }
            }])
            
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

            const slug = slugify(name, {
                replacement: "-",
                lower: true,
                trim: true
            })

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
                        slug,
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
                        slug,
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

    async getTopThreeBookFollowView(req, res, next) {
        try {
            const {
                per
            } = req.query

            const books = await Book.find().sort({
                "view": -1
            }).limit(parseInt(per)).populate("category").populate("country")

            if (!books) {
                return res.status(400).json({
                    success: false,
                    message: "Can't get!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get top 3 the most viewed book successfully!",
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

    async getTopThreeBookFollowFavorite(req, res, next) {
        try {
            const {
                per
            } = req.query

            const books = await Book.find().sort({
                "numberOfFavorites": -1
            }).limit(parseInt(per)).populate("category").populate("country")

            if (!books) {
                return res.status(400).json({
                    success: false,
                    message: "Can't get!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get top 3 the most favorite book successfully!",
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

    async initBookFromFile(req, res, next) {
        try {
            await fs.readFile("books.json", "utf8", async (err, data) => {
                const obj = JSON.parse(data);
                for (let i of obj) {
                    const category = await Category.findOne({
                        name: i.category[0].name
                    })

                    let categories = []
                    categories.push(category._id)

                    const newBook = new Book({
                        name: i.name,
                        description: i.description,
                        author: i.author,
                        category: categories,
                        country: new ObjectID("63a976915192960b76814853"),
                        image: i.image
                    })

                    await newBook.save()

                    for (let j of i.chapters) {
                        console.log(j.name)
                        const newChapter = new Chapter({
                            name: j.name,
                            book: newBook._id,
                            contentText: j.content
                        })

                        await newChapter.save()
                    }
                }
            })

            return res.status(200).json({
                success: true,
                message: "Create book and chapters of this book successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getPageBook(req, res, next) {
        try {
            const {
                per,
                page,
                q,
                category,
                country
            } = req.query

            let books = []

            if (!q && !category && !country) {
                books = await getBooks()
            } else {
                books = await searchBooks(q, category, country)
            }

            books = await getPer(books, per, page)

            return res.status(200).json({
                success: true,
                message: "Successfully!",
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

module.exports = new BookController()