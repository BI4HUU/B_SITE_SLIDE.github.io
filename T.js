const tokenVK = 'e35d6cceec3110d8d4939a27a9050409e21c85464afeef907071a9cb44446b3bf5faf8159e88b3d79da81';
const tokenT = '479015323:AAHDex4fuVMMNNO9vt_OX42BHZFPeTugGDw';
const vkapi = new (require('node-vkapi'))({ accessToken: `${tokenVK}`});
// const TelegramBot = require('node-telegram-bot-api');
// const bot = new TelegramBot(tokenT, {polling: true});
let arr = [],sarr = [],arrNew = [],sArrNew = [],arrHistory = [],body,chatId = '459707765',ID = "55324081";

var WebSocketServer = new require('ws');
var webSocketServer = new WebSocketServer.Server({port: 9999});
webSocketServer.on('connection', function(ws) {
// ws.send();

    ws.on('message', function(message) {
		message = JSON.parse(message)
        console.log(message)
		
        if (message[0] == 'f') {
			vkapi.call('friends.search', {user_id: `${ID}`, message: `f`, count: `333`}).then( body => {//
				arr = [["Микола","55324081"]]
				for (var i = 0; i < body.items.length; i++ ) {
						sarr = [`${body.items[i].first_name} ${body.items[i].last_name}`, `${body.items[i].id}`];
						arr.unshift(sarr)
				}
				ws.send(`g([['<div onClick="in_r(this)" id="', '">', '</div>'], ${JSON.stringify(arr)}])`) // 
				sarr = []
				arr = []
			});
        }
        if (message[0] == 'o') {
			ws.send("g([[`<div onClick='in_r(this)' id='`, `'>`, `</div>`], [[`1name`, `id1`]]])")
		}
		
        if (message[0] == 'h') {
			// vkapi.call('messages.getHistory', {user_id: `${ID}`, count: `8`}).then( body3 => {
			vkapi.call('messages.getHistory', {user_id: `${message[1]}`, count: `18`}).then( body3 => {
				itemsH = body3.items; 
				for (var i = 0;i < itemsH.length; i++ ) { 
						arrHistory.unshift([`${body3.items[i].body}`])
				}
				ws.send(`h([['${ message[1] }'], ${JSON.stringify(arrHistory)}])`)
				arrHistory = []
				// bot.sendMessage(chatId, "History Messeg", {reply_markup: {	inline_keyboard: arrHistory}});arrHistory = [];
			});
        }
		if (message[0] == 'm') {////////////////////////
			vkapi.call('messages.send', {
				user_id:   `${message[1]}`,
				message:  `${message[2]}`
			}).then(users => {
				// h(e)
				ws.send(`h([['${ message[1] }'], ${JSON.stringify(arrHistory)}])`)
				console.dir(`send :  ${message[1]}`)}
			);

            // ws.send(`h([['${ message[1] }'], ['cmc_OK ${ message[1] } ${ message[2] }']])`)
		}
		setInterval(() =>{ // Новые сообщения
			vkapi.call('messages.get', {
				count:   '8'
			}).then(users => {
				for (var i = 0; i < users.items.length; i++ ) {
					sArrNew = [{ user_id: `${users.items[i].user_id}`, body: `${users.items[i].body}` }];
					if (users.items[i].read_state == 0) {
						arrNew.unshift(sArrNew)
					}
				}
				sendAllFriends2()
				function sendAllFriends2() {
					if (arrNew.length >= 1) {
						arrSpliceNew = arrNew.splice(0, 1)
						if (arrSpliceNew[0][0]) {
							vkapi.call('users.get', {
								user_ids: `${arrSpliceNew[0][0].user_id}`
							}).then(users => {
								sArrNew2 = [`${users[0].first_name} ${users[0].last_name}`, `${arrSpliceNew[0][0].body}`, `${arrSpliceNew[0][0].user_id}`];
								console.log(`o([['<div onClick="in_r(this)" id="', '">', '</div>'], ${JSON.stringify(sArrNew2)}])`)
								ws.send(`o([['<div onClick="in_r(this)" id="', '">', '</div>'], ${JSON.stringify(sArrNew2)}])`)
							})
						}
					}
					setTimeout(function() {
						if(arrNew.length > 0){sendAllFriends2()};
					}, 1000);
				}
			})
		}, 30000);
        // console.log(message[0])
	})
});
// bot.on('message', (msg) => {
// 	chatId = msg.chat.id;
// 	if (chatId == '459707765') {
// 		if (msg.text==`f`) {//++
// 			console.log(msg.text)
//             vkapi.call('friends.search', {user_id: `${ID}`, message: `${msg.text}`, count: `333`}).then( body => {//
//                     for (var i = 0; i < body.items.length; i++ ) {
//                             sarr = [];
//                             sarr = [{ text: `${body.items[i].first_name} ${body.items[i].last_name}`, callback_data: `${body.items[i].id}` }];
//                             arr.unshift(sarr)
//                     }
//                 	bot.sendMessage(chatId, "All Friends", {reply_markup: {	inline_keyboard: arr}});arr = [[{ text: 'Микола Устименко', callback_data: '55324081' }]];
//             });
// 		}//++
// 		else {if (msg.text==`h`) {//++
// 			vkapi.call('messages.getHistory', {user_id: `${ID}`, count: `8`}).then( body3 => {
// 				itemsH = body3.items; 
// 				for (var i = 0;i < itemsH.length; i++ ) { 
// 						arrHistory.unshift([{ text: `${body3.items[i].body}`, callback_data: `test1` }])
// 				}
// 				bot.sendMessage(chatId, "History Messeg", {reply_markup: {	inline_keyboard: arrHistory}});arrHistory = [];
// 			});
// 		}
// 		else {if (msg.text==`/start`) {}
// 		else {if (msg.text==`r`) {ID = "55324081";}
// 		else {if (msg.text==`b`) {
// 			arr = [[{ text: 'Олег Снадин', callback_data: '35591927' }],[{ text: 'Артур Сокиринский', callback_data: '28305343' }]];
// 			bot.sendMessage(chatId, "Super Friends", {reply_markup: {	inline_keyboard: arr}});arr = [[{ text: 'Микола Устименко', callback_data: '55324081' }]];
// 		} 
// 		else {//++

// 			vkapi.call('messages.send', {//++
// 				user_id:   `${ID}`,
// 				message:  `${msg.text}`
// 			}).then(users => {

// 				console.dir('send', users)}
// 			);
// 		}
// 			}
// 			}
// 			}
// 			}
// 	}
// });
// bot.on('callback_query', function (msg) {
// 	if (msg.data=='test1') {
// 		bot.sendMessage(msg.from.id, 'Ответ верный ✅');
// 	} else {
// 		ID = msg.data;
// 		vkapi.call('messages.markAsRead', {
// 			peer_id: `${ID}`
// 		});
// 	}
// });
// setInterval(() =>{ // Новые сообщения
// 	vkapi.call('messages.get', {
// 		count:   '8'
// 	}).then(users => {
// 		for (var i = 0; i < users.items.length; i++ ) {
// 			sArrNew = [{ user_id: `${users.items[i].user_id}`, body: `${users.items[i].body}` }];
// 			if (users.items[i].read_state == 0) {
// 				arrNew.unshift(sArrNew)
// 			}
// 		}
// 		sendAllFriends2()
// 		function sendAllFriends2() {
// 			if (arrNew.length >= 1) {
// 				arrSpliceNew = arrNew.splice(0, 1)
// 				if (arrSpliceNew[0][0]) {
// 					vkapi.call('users.get', {
// 						user_ids: `${arrSpliceNew[0][0].user_id}`
// 					}).then(users => {
// 						sArrNew2 = [`${users[0].first_name} ${users[0].last_name}`, `${arrSpliceNew[0][0].body}`, `${arrSpliceNew[0][0].user_id}`];
						
// 						console.log(`o([['<div onClick="in_r(this)" id="', '">', '</div>'], ${JSON.stringify(sArrNew2)}])`)
// 						// ws.send(`o([['<div onClick="in_r(this)" id="', '">', '</div>'], ${JSON.stringify(sArrNew2)}])`)
// 						// bot.sendMessage(chatId, "NEW MESSEG", {reply_markup: {	inline_keyboard: [sArrNew2]}});
// 					})
// 				}
// 			}
// 			setTimeout(function() {
// 				if(arrNew.length > 0){sendAllFriends2()};
// 			}, 1000);
// 		}
// 	})
// }, 30000);