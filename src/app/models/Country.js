const mongoose = require("mongoose")
const Schema = mongoose.Schema
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)

const Country = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "name"
    }
})

module.exports = mongoose.model("countries", Country)