const WebSocket = require('ws')
const ws = new WebSocket("ws://localhost:5000")

ws.onopen = function () {
    ws.onmessage = function (message) {
        message_json = JSON.parse(message.data)
        topic_info = JSON.parse(message_json['message'])

		console.log(message_json)
        console.log("\n----------------\n")
    }
    console.log("Connected")
}
