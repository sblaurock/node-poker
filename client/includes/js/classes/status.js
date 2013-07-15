define(["prototype"], function() {
	var Status = Class.create({
		initialize: function() {
			this.dom = {
				users: $('users'),
				funds: $('funds'),
				update: $('update')
			},
			this.updates = {
				countdown: 'New round will start in: '
			}
			this.buffer = {}
		},
		updateUsers: function(players, guests) {
			var playerTerm = players != 1 ? 'Players' : 'Player';
			var guestTerm = guests != 1 ? 'Guests' : 'Guest';

			this.dom.users.innerHTML = '<span>' + players + ' ' + playerTerm + '</span>' + guests + ' ' + guestTerm;
		},
		updateFunds: function(funds) {
			this.dom.funds.innerHTML = (parseInt(funds)).format();
		},
		setUpdate: function(type, content) {
			if(this.updates[type]) {
				if(type === 'countdown') {
					var that = this;

					clearInterval(this.buffer);
					this.buffer = setInterval(function() {
						if(content === 0) {
							clearInterval(that.buffer);
							return;
						}
						that.dom.update.innerHTML = that.updates.countdown + --content;
					}, 1000);
				}
			}
		}
	});

	return Status;
});