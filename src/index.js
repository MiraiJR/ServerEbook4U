const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const route = require("./routes/index.js")
const connectDB = require("./database/connectDB.js")
const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))


// connect to DB mongodb
connectDB()

// configure port
const PORT = process.env.PORT || 5000

route(app)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))