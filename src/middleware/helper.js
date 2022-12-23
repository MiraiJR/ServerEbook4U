const {
    ObjectID
} = require("bson")
const FavouriteBook = require("../app/models/FavouriteBook.js")
const Notification = require("../app/models/Notification.js")

const findListUserLikeThisBook = async (idBook) => {
    const result = await FavouriteBook.find({
        books: idBook
    })

    return result
}

const pushNotification = async (content, type, id) => {
    const listReceiver = await findListUserLikeThisBook(id)

    if (listReceiver != 0) {
        for (let i of listReceiver) {
            const newNotify = new Notification({
                receiver: i.user,
                content,
                type,
                object: id,
                createdAt: Date.now(),
                status: false
            })

            await newNotify.save()
        }
    }
}

const pushNotificationToAdmin = async (content, type, id) => {
    const newNotify = new Notification({
        receiver: new ObjectID("639d6ce91ba5712897dd1926"), //admin
        content,
        type,
        object: id,
        createdAt: Date.now(),
        status: false
    })

    await newNotify.save()
}

module.exports = {
    findListUserLikeThisBook,
    pushNotification,
    pushNotificationToAdmin
}