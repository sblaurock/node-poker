define(["prototype", "send"], function(Prototype, send) {
	var Game = Class.create({
		initialize: function() {
			this.dom = {
				claimButtons: $$('.claim'),
				players: $$('.player'),
				attributes: $$('.attributes'),
				pot: $('pot-value')
			},
			this.openClass = 'open',
			this.detailsClass = 'details',
			this.nameClass = 'name',
			this.fundsClass = 'funds',
			this.statusClass = 'status',
			this.dealerClass = 'dealer',
			this.smallBlindClass = 'small',
			this.bigBlindClass = 'big'
		},
		updateSeats: function(players) {
			var players = new Hash(players);
			var that = this;

			this.dom.players.each(function(player) {
				if(player.down('.' + that.openClass).hasClassName('hide')) {
					player.down('.' + that.detailsClass).addClassName('hide');
					player.down('.' + that.openClass).removeClassName('hide');
				}
			});

			players.each(function(player) {
				slot = $('p' + player.value.seat);
				slot.down('.' + that.nameClass).innerHTML = player.key;
				slot.down('.' + that.fundsClass).innerHTML = '$' + (parseInt(player.value.funds)).format();
				slot.down('.' + that.statusClass).innerHTML = player.value.status;
				slot.down('.' + that.openClass).addClassName('hide');
				slot.down('.' + that.detailsClass).removeClassName('hide');
			});
		},
		updateSeatsWaiting: function() {
			this.dom.claimButtons.each(function(button) {
				button.addClassName('hide');
			});
		},
		updateAttributes: function(dealer, smallBlind, bigBlind) {
			var that = this;

			this.dom.attributes.each(function(player) {
				player.down('.' + that.dealerClass).addClassName('hide');
				player.down('.' + that.smallBlindClass).addClassName('hide');
				player.down('.' + that.bigBlindClass).addClassName('hide');
			});

			$('p' + dealer).down('.' + that.dealerClass).removeClassName('hide');
			$('p' + smallBlind).down('.' + that.smallBlindClass).removeClassName('hide');
			$('p' + bigBlind).down('.' + that.bigBlindClass).removeClassName('hide');
		},
		updatePot: function(amount) {
			this.dom.pot.innerHTML = parseInt(amount).format();
		}
	});

	return Game;
});