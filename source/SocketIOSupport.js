const SocketIOServer = require("socket.io");

function configSocketIO(server) {
    let io = SocketIOServer(server);

    io.on("connection", socket => {

        socket.on("viewerJoinedIn", () => {
            console.debug("viewerJoinedIn");
            socket.broadcast.emit("viewerJoinedIn", {viewerSid: socket.id});
        });

        socket.on("broadcasterOffer", data => {
            io.to(data.to).emit("broadcasterOffer", data);
        });

        socket.on("viewerAnswer", data => {
            io.to(data.to).emit("viewerAnswer", data);
        });

        socket.on("ice", data => {
            io.to(data.to).emit("ice", data);
        });
    });
}


module.exports.configSocketIO = configSocketIO;
