const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Notification = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now()
    },
    status: { // Status notification if status = 0 is same mean "this notification isn't read" else 1 "this notification is read"
        type: Boolean,
        dafault: false
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "type"
    },
    type: {
        type: String,
        enum: ["books", "reports", "comments", "users"],
        default: "books"
    }
})

module.exports = mongoose.model("notifications", Notification)