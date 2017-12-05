var WebSocketServer = new require('ws');
// var fs = new require("fs");

var webSocketServer = new WebSocketServer.Server({
	port: 9999
});
webSocketServer.on('connection', function(ws) {

// ws.send();

    ws.on('message', function(message) {
    if (message == '1') {
        ws.send("g([[`<div>`, `<div>`], [`1`, `2`, `3`, `2`, `3`, `2`, `3`]])")
    }

	console.log('пс ' + message)
	})
});

            // fs.readFileSync("1.html", "utf8")