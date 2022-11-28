const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FavouriteBook = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "books"
    }]
})

module.exports = mongoose.model("favouritebooks", FavouriteBook)