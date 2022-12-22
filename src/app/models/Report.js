const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Report = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'type'
    },
    type: {
        type: String,
        enum: ["books", "comments", "users"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("reports", Report)