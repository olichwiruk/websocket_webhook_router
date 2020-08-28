const WebSocket = require('ws')
const ws = new WebSocket("ws://localhost:5000")

ws.onopen = function () {
    ws.onmessage = function (message) {
        message_json = JSON.parse(message.data)
        topic_info = JSON.parse(message_json['message'])

		console.log(message_json['request']['url'])
        console.log(topic_info)
        // console.log(message_json['request'])
        console.log("\n----------------\n")
    }
    console.log("Connected")
}
