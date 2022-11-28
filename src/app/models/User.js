const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: Date,
        default: "01-01-2000"
    },
    address: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["Reader", "Author", "Translator", "Admin"],
        default: "Reader"
    }
})

module.exports = mongoose.model("users", User)