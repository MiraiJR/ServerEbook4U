const History = require("../models/History.js")

class HistoryController {
    async getHistoryBook(req, res, next) {
        try {
            const idUser = req.userID

            const userHistoryBook = await History.findOne({
                user: idUser
            }).populate("books")

            if (!userHistoryBook) {
                return res.status(200).json({
                    success: true,
                    message: "Get favorite list of the user successfully!",
                    data: []
                })
            }

            return res.status(200).json({
                success: true,
                message: "Get favorite list of the user successfully!",
                data: userHistoryBook.books
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }


    async addBookToHistory(req, res, next) {
        try {
            const idUser = req.userID
            const idBook = req.body.idBook

            const userHistoryBook = await History.findOne({
                user: idUser
            })

            if (!userHistoryBook) {
                let books = []
                books.push(idBook)

                // in case, user don't have list favorite book so we create new FavoriteBook
                const newUserHistoryBook = new History({
                    user: idUser,
                    books
                })

                await newUserHistoryBook.save()

                const result = await History.findOne({
                    user: idUser
                }).populate("books")

                return res.status(200).json({
                    success: true,
                    message: "create and add this book to list successfully!",
                    data: result.books
                })
            }

            userHistoryBook.books.push(idBook)

            await userHistoryBook.save()

            const result = await History.findOne({
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

    async removeBookFromHistory(req, res, next) {
        try {
            const idUser = req.userID
            const idBook = req.body.idBook

            const userHistoryBook = await History.findOne({
                user: idUser
            })

            if (!userHistoryBook) {
                return res.status(400).json({
                    success: false,
                    message: "The user doesn't have favorite book!"
                })
            }

            userHistoryBook.books = userHistoryBook.books.filter(id => id != idBook)

            await userHistoryBook.save()

            const result = await History.findOne({
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

module.exports = new HistoryController()