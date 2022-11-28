require("dotenv").config()
const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const route = require("./routes/index.js")
const connectDB = require("./database/connectDB.js")
const session = require("express-session")

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// configure session
app.set('trust proxy', 1)
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// connect to DB mongodb
connectDB()

// configure port
const PORT = process.env.PORT || 5000

route(app)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))