const mongoose = require("mongoose")
const Schema = mongoose.Schema

const History = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "books"
    }]
})

module.exports = mongoose.model("histories", History)