
function route(app) {
    app.use("/", (req, res) => {
        return res.send("hello")
    })
}

module.exports = route