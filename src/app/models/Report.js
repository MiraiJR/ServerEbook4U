const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Report = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    type: {
        type: String,
        enum: ["book", "comment", "user"],
        required: true
    }, 
    reason: {
        type: String,
        required: true
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("reports", Report)