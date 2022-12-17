const socketio = require("socket.io")

function notifcation(server) {
    const io = socketio(server)

    io.on("connection", (socket) => {
        console.log(`${socket.id} is connecting!`)

        socket.on("msg_from_client", (msg) => {
            console.log(socket.id + ": message is " + msg)
        })
    })
}

module.exports = notifcation