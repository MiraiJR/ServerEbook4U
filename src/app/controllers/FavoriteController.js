const Book = require("../models/Book.js")
const FavoriteBook = require("../models/FavouriteBook.js")

class FavoriteController {
    async getFavoriteList(req, res, next) {
        try {
            const idUser = req.userID

            const userFavoriteBook = await FavoriteBook.findOne({
                user: idUser
            }).populate("books")

            if (!userFavoriteBook) {
                return res.status(200).json({
                    success: true,
                    message: "Get favorite list of the user successfully!",
                    data: []
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get favorite list of the user successfully!",
                data: userFavoriteBook.books
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }


    async addBookToFavoriteList(req, res, next) {
        try {
            const idUser = req.userID
            const idBook = req.body.idBook

            await Book.updateOne({
                _id: idBook
            }, {
                $inc: {
                    numberOfFavorites: 1
                }
            })

            const userFavoriteBook = await FavoriteBook.findOne({
                user: idUser
            })

            if (!userFavoriteBook) {
                let books = []
                books.push(idBook)

                // in case, user don't have list favorite book so we create new FavoriteBook
                const newUserFavoriteBook = new FavoriteBook({
                    user: idUser,
                    books
                })

                await newUserFavoriteBook.save()

                const result = await FavoriteBook.findOne({
                    user: idUser
                }).populate("books")

                return res.status(200).json({
                    success: true,
                    message: "create and add this book to list successfully!",
                    data: result.books
                })
            }

            userFavoriteBook.books.push(idBook)

            await userFavoriteBook.save()

            const result = await FavoriteBook.findOne({
                user: idUser
            }).populate("books")

            return res.status(200).json({
                success: true,
                message: "create and add this book to list successfully!",
                data: result.books
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async removeBookFromFavoriteList(req, res, next) {
        try {
            const idUser = req.userID
            const idBook = req.body.idBook

            // when anyone remove, we reduce the field "numberOfFavorites" 1 
            await Book.updateOne({
                _id: idBook
            }, {
                $inc: {
                    numberOfFavorites: -1
                }
            })

            const userFavoriteBook = await FavoriteBook.findOne({
                user: idUser
            })

            if (!userFavoriteBook) {
                return res.status(400).json({
                    success: false,
                    message: "The user doesn't have favorite book!"
                })
            }

            userFavoriteBook.books = userFavoriteBook.books.filter(id => id != idBook)

            await userFavoriteBook.save()

            const result = await FavoriteBook.findOne({
                user: idUser
            }).populate("books")

            return res.status(200).json({
                success: true,
                message: "Remove this book from list favorite book successfully!",
                data: result.books
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

module.exports = new FavoriteController()