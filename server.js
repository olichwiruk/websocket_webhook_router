const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 5000, host: "0.0.0.0" });

server.on('connection', function (socket, request) {
    // console.log("CONNECTION %s", request)

    socket.on("open", function () {
        console.log("OPEN")
    })

    socket.on('message', function (message) {
        // console.log('MESSAGE: %s REQUEST_IN_MESSAGE', message, request.url);

        if (request.url.includes("/topic/")) {
            // Note(KKrzosa): Route the message to all connected servers except the agent
            server.clients.forEach(function (client_socket) {
                if (client_socket != socket && client_socket.readyState == WebSocket.OPEN) {
                    data = { "message": message, "request": request }


                    client_socket.send(JSON.stringify(data))
                }
            })
        }

    });


    socket.on("ping", function (data) {
        console.log("PING %s", data)
    })

    socket.on("close", function (code, reason) {
        // console.log("CLOSE code %s reason %s", code, reason)
    })

    socket.on("error", function (error) {
        console.log("ERROR %s", error)
    })

    socket.on("upgrade", function (data) {
        console.log("UPGRADE, %s", data)
    })

    socket.on("unexpected-response", function (data) {
        console.log("UNEXPECTED_RESPONSE %s", data)
    })

    // socket.send('something');
});
