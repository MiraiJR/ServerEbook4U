const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)

const Book = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        slug: "name",
    },
    author: {
        type: String, 
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }],
    view: {
        type: Number,
        default: 0
    },
    numberOfFavorites: {
        type: Number,
        default: 0
    },
    starRate: {
        type: Number,
        default: 0
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "countries",
        required: true
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

module.exports = mongoose.model("books", Book)