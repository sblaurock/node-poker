define(["lib/inheritance", "send", "classes/poker"], function(i, send, PokerClass){
	var Poker = new PokerClass;

	var Game = Class.extend({
		init: function() {
			var params = {
				_players: 0,
				_guests: 0,
				_maxPlayers: 6,
				_minPlayers: 2,
				_startDelay: 3,
				_startFunds: 5000,
				_blind: 50
			}
			this.getParam = function(key) {
				return params['_' + key];
			}
			this.setParam = function(key, value) {
				params['_' + key] = value;
				return true;
			}
			this.online = {},
			this.players = {},
			this.seats = {},
			this.round = {},
			this.buffer = {},
			this.pot = 0;
		},
		access: function(username, password, seat, socket) {
			var game = this;
			var seat = seat.replace(/[^0-9]/g, '');

			// Ensure seat is valid.
			if(seat < 1 || seat > this.getParam('maxPlayers') || this.seats[seat]) {
				send.client(socket, 'Account.hide');
				return;
			}

			// Ensure account is not logged in, and player is not connecting more than once per socket.
			if(this.online[socket.id] || this.players[username]) {
				send.client(socket, 'Account.hide');
				return;
			}

			Account.access(username, password, seat, socket, function(player) {
				if(player) {
					// Clear start buffer.
					clearTimeout(game.buffer);

					// Add player to game.
					game.addPlayer(socket, player);

					// Update player/guest counts.
					game.setParam('guests', game.getParam('guests') - 1);
					game.setParam('players', game.getParam('players') + 1);

					// Update UI.
					send.all('Status.updateUsers', [ game.getParam('players'), game.getParam('guests') ]);
					send.all('Game.updateSeats', [ game.players ]);
					send.all('Chat.add', [ 'system', { 'message' : username + ' has joined the game!' } ]);
					send.client(socket, 'Account.hide');
					send.client(socket, 'Game.updateSeatsWaiting');
					send.client(socket, 'Status.updateFunds', [ player.funds ]);

					if(game.getParam('players') >= game.getParam('minPlayers')){
						send.all('Status.setUpdate', [ game.getParam('startDelay'), 'countdown' ]);
						game.buffer = setTimeout(function() {
							game.newRound();
						}, (game.getParam('startDelay') * 1000));
					}
				}
			});
		},
		addPlayer: function(socket, player) {
			var username = player.username;

			delete player.password;
			delete player.username;

			this.online[socket.id] = username;
			this.seats[player.seat] = socket;
			this.players[username] = player;
		},
		disconnect: function(socketId) {
			if(this.online[socketId]) {
				var username = this.online[socketId];
				var seat = this.players[username].seat;

				delete this.online[socketId];
				delete this.seats[seat];
				delete this.players[username];

				send.all('Game.updateSeats', [ this.players ]);
				send.all('Chat.add', [ 'system', { 'message' : username + ' has left the game' } ]);
				this.setParam('players', this.getParam('players') - 1);
				send.all('Status.updateUsers', [ this.getParam('players'), this.getParam('guests') ]);
			} else {
				send.all('Chat.add', [ 'system', { 'message' : 'Guest has disconnected' } ]);
				this.setParam('guests', this.getParam('guests') - 1);
				send.all('Status.updateUsers', [ this.getParam('players'), this.getParam('guests') ]);
			}
		},
		newRound: function() {
			var i = 1,
				r = 0,
				dealer = 0,
				hand = 1,
				socket = {},
				newFunds = 0,
				deck = {};

			// Add active players to the round.
			this.round = {};
			for(var seat in this.seats) {
				this.round[i] = seat;
				i++;
			}
			this.round['count'] = i - 1;

			// Assign dealer and blinds.
			dealer = Math.floor((Math.random() * (this.round['count'])) + 1);
			this.round['dealer'] = dealer;
			this.round['smallBlind'] = dealer - 1 < 1 ? this.round['count'] : dealer - 1;
			this.round['bigBlind'] = dealer - 2 < 1 ? this.round['count'] + (dealer - 2) : dealer - 2;
			send.all('Game.updateAttributes', [ this.round[this.round['dealer']], this.round[this.round['smallBlind']], this.round[this.round['bigBlind']] ]);

			// Add blinds to pot.
			socket = this.seats[this.round[this.round['bigBlind']]];
			newFunds = this.updateFunds(this.online[socket.id], 0, this.getParam('blind'));
			send.client(socket, 'Status.updateFunds', [ newFunds ]);
			socket = this.seats[this.round[this.round['smallBlind']]];
			newFunds = this.updateFunds(this.online[socket.id], 0, this.getParam('blind') / 2);
			send.client(socket, 'Status.updateFunds', [ newFunds ]);
			send.all('Game.updateSeats', [ this.players ]);
			this.updatePot(this.getParam('blind') + (this.getParam('blind') / 2));

			// Deal out player hands.
			deck = Poker.newDeck();
			r = this.round['dealer'] > 1 ? this.round['dealer'] - 1 : this.round['count'];
			for(i = this.round['count']; i > 0; i--) {
				send.client(this.seats[this.round[r]], 'Poker.setCard', [ 'hand' + hand, deck.next() ]);

				if(r === 1) {
					r = this.round['count'];
				} else {
					r--;
				}

				if(i === 1 && hand < 2) {
					i = this.round['count'] + 1;
					hand = 2;
				}
			}

			// Update the UI of the player in focus.
			//  > Big blind player should not be the first player to gain focus.
			this.setTurn(this.seats[this.round[this.round['bigBlind']]]);
		},
		updateFunds: function(username, operation, amount) {
			var newFunds = 0;

			if(operation === 0) {
				// Subtract
				newFunds = this.players[username].funds - amount
				this.players[username].funds = newFunds;
				Account.updateFunds(username, newFunds);
			} else {
				// Add
				newFunds = this.players[username].funds - amount;
				this.players[username].funds = newFunds;
				Account.updateFunds(username, newFunds);
			}

			return newFunds;
		},
		updatePot: function(amount) {
			var newAmount = this.pot + amount;

			this.pot = newAmount;
			send.all('Game.updatePot', [ newAmount ]);
		},
		setTurn: function(socket) {
			var username = this.online[socket.id];

			// Should we push this functionality onto the client side?
			send.all('Status.setUpdate', [ 'Waiting for ' + username + '...' ]);
			send.all('Game.setFocus', [ this.players[username].seat ]);
			send.client(socket, 'Status.setStatus', [ 'It\'s your turn! Select an action above.' ]);
		}
	});

	return Game;
});