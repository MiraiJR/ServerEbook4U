const AuthRouter = require("./auth.js")
const ApiRouter = require("./api.js")


function route(app) {
    app.use("/api", ApiRouter)
    app.use("/auth", AuthRouter)
    app.use("/", (req, res) => {
        return res.send("hello")
    })
}

module.exports = route