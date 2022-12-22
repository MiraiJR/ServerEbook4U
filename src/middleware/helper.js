const FavouriteBook = require("../app/models/FavouriteBook.js")
const Notification = require("../app/models/Notification.js")

const findListUserLikeThisBook = async (idBook) => {
    const result = await FavouriteBook.find({
        books: idBook
    })

    return result
}

const pushNotification = async (content, book) => {
    const listReceiver = await findListUserLikeThisBook(book)

    if (listReceiver != 0) {
        for (let i of listReceiver) {
            const newNotify = new Notification({
                receiver: i.user,
                content,
                book,
                createdAt: Date.now(),
                status: false
            })

            await newNotify.save()
        }
    }
}

module.exports = {
    findListUserLikeThisBook,
    pushNotification
}