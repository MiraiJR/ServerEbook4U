require("dotenv").config()
const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const connectDB = require("./database/connectDB.js")
const session = require("express-session")
const route = require("./routes/index.js")
const notifcation = require("./app/Socket/NotificationSocket.js")
const cors = require("cors")

const app = express()
const server = require('http').createServer(app)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// configure session
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}))

// avoid the blocked request of the backend
app.use(cors())

// connect to DB mongodb
connectDB()

// configure port
const PORT = process.env.PORT || 5000

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!')
})

// connect socketio
notifcation(server)
route(app)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))