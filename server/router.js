define(["io", "send", "classes/game", "classes/chat", "classes/account"], function(io, send, GameClass, ChatClass, AccountClass) {
	var that = this;

	this.Game = new GameClass;
	this.Chat = new ChatClass;
	this.Account = new AccountClass;

	io.sockets.on('connection', function (socket) {
		var guests = Game.getParam('guests') + 1;
		Game.setParam('guests', guests);
		send.all('Chat.add', [ 'system', { 'message' : 'Guest has connected!' } ]);
		send.all('Status.updateUsers', [ Game.getParam('players'), guests ]);
		send.client(socket, 'Game.updateSeats', [ Game.players ]);
		socket.on('disconnect', function () {
			Game.disconnect(socket.id);
		});

		// Listen for data from Node and route it to the appropriate class.
		socket.on('data', function(data) {
			var handler = data.handler.split('.');
			var c = handler[0],
				m = handler[1];

			if(typeof that[c] === 'object') {
				var classObject = that[c];

				if(typeof classObject[m] == 'function') {
					var arguments = data.data;

					arguments[arguments.length] = socket;
					(classObject[m]).apply(classObject, arguments);
				} else {
					console.log('Requested class method does not exist.');
				}
			} else {
				console.log('Requested class does not exist.');
			}
		});
	});
});