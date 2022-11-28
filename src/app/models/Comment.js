const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Comment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "books"
    },
    content: {
        type: String,
        required: true
    },
    answer: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        content: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("comments", Comment)