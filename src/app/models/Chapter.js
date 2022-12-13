const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)

const Chapter = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "books"
    },
    contentText: {
        type: String
    },
    contentImage: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("chapters", Chapter)