const AuthRouter = require("./auth.js")
const ApiRouter = require("./api.js")
const ImageRouter = require("./image.js")

function route(app) {
    app.use("/api", ApiRouter)
    app.use("/auth", AuthRouter)
    app.use("/image", ImageRouter)
    app.use("/", (req, res) => {
        return res.send("hello")
    })
}

module.exports = route