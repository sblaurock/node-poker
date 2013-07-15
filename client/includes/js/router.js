define(["io", "classes/chat", "classes/status", "classes/account", "classes/game", "classes/poker"], function(socket, ChatClass, StatusClass, AccountClass, GameClass, PokerClass) {
	var that = this;

	this.Chat = new ChatClass;
	this.Status = new StatusClass;
	this.Account = new AccountClass;
	this.Game = new GameClass;
	this.Poker = new PokerClass;

	// Listen for data from Node and route it to the appropriate class.
	socket.on('data', function(data) {
		var handler = data.handler.split('.');
		var c = handler[0],
			m = handler[1];

		if(typeof that[c] === 'object') {
			var classObject = that[c];

			if(typeof classObject[m] == 'function') {
				(classObject[m]).apply(classObject, data.data);
			} else {
				console.log('Requested class method does not exist.');
			}
		} else {
			console.log('Requested class does not exist.');
		}
	});

	require(["events"]);
});