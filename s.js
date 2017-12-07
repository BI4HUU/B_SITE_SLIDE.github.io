var WebSocketServer = new require('ws');
// var fs = new require("fs");

var webSocketServer = new WebSocketServer.Server({port: 9999});
webSocketServer.on('connection', function(ws) {
// ws.send();

    ws.on('message', function(message) {
        message = JSON.parse(message)
        if (message[0] == 'f') {
            ws.send("g([[`<div onClick='in_r(this)' id='`, `'>`, `</div>`], [[`1name`, `id1`], [`2name`, `id2`], [`3name`, `id3`], [`4name`, `id4`], [`5name`, `id5`], [`6name`, `id6`]]])")
        }
        if (message[0] == 'o') {
            ws.send("g([[`<div onClick='in_r(this)' id='`, `'>`, `</div>`], [[`1name`, `id1`]]])")
        }
        if (message[0] == 'h') {
            ws.send(`h([['${ message[1] }'], ['hhhhhistory']])`)
        }
        if (message[0] == 'm') {
            ws.send(`h([['${ message[1] }'], ['cmc_OK ${ message[1] } ${ message[2] }']])`)
        }
        // console.log(message[0])
        console.log(message)
	})
});

            // fs.readFileSync("1.html", "utf8")