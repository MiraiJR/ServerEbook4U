const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AmountView = new Schema({
    date: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        dafault: 0
    }
})

module.exports = mongoose.model("amountview", AmountView)