define(["prototype", "send"], function(Prototype, send) {
	var Account = Class.create({
		initialize: function() {
			this.dom = {
				player: $$('.player'),
				close: $('close'),
				access: $('access'),
				account: $('account'),
				instructions: $('instructions'),
				username: $('username'),
				password: $('password'),
			}
			this.errorClass = 'error';
			this.claimClass = 'claim';
			this.invalidLength = 'We need something to identify you by!<br />Enter a username and password to join the game.';
		},
		show: function(seat) {
			this.seat = seat;
			this.dom.account.addClassName('fade in');
			this.dom.username.focus();
		},
		hide: function() {
			this.dom.account.removeClassName('in');
		},
		access: function() {
			var username = this.dom.username.value;
			var password = this.dom.password.value;

			if(username.length < 1 || password.length < 1) {
				this.error(this.invalidLength);
			} else {
				send('Game.access', [ username, password, this.seat ]);
			}
		},
		error: function(message) {
			this.dom.instructions.addClassName(this.errorClass);
			this.dom.instructions.innerHTML = message;
		}
	});

	return Account;
});