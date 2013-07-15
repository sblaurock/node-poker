define(["prototype", "send"], function(Prototype, send) {
	var Poker = Class.create({
		initialize: function() {
			this.dom = {
				hand: $('hand'),
				handCards: $$('#hand .card'),
				community: $('community'),
				communityCards: $$('#community .card'),
				cards: $$('.card'),
				dividers: $$('.divider')
			},
			this.params = {
				dividerWidth: 10,
				cardMaxWidth: 144
			}

			this.initializeCards();
		},
		initializeCards: function() {
			var poker = this;

			// Set divider width.
			this.dom.dividers.each(function(divider) {
				divider.setStyle({
					width: poker.params.dividerWidth + 'px'
				});
			});

			this.resizeCards();

			// Set all cards to back.
			this.dom.cards.each(function(card) {
				poker.setCard(card, 'XX');
			});
		},
		resizeCards: function() {
			// Set hand card width.
			var handWidth = this.dom.hand.getWidth(),
				handPadding = parseInt(this.dom.hand.getStyle('padding-left')) * 2,
				handCardWidth = 0,
				handCardHeight = 0,
				backgroundWidth = 0,
				backgroundHeight = 0;

			handCardWidth = (handWidth - ((this.params.dividerWidth * 2) + handPadding)) / 2;
			handCardWidth = handCardWidth < this.params.cardMaxWidth ? handCardWidth : this.params.cardMaxWidth;
			handCardHeight = handCardWidth * 1.5;
			backgroundHeight = handCardWidth * 13;
			backgroundWidth = handCardWidth * 14;
			backgroundHeight = handCardHeight * 4;

			this.dom.handCards.each(function(card) {
				card.setStyle({
					width: handCardWidth + 'px',
					height: handCardHeight + 'px',
					backgroundSize: backgroundWidth + 'px ' + backgroundHeight + 'px'
				});
			});

			// Set community card width.
			var communityWidth = this.dom.community.getWidth(),
				communityPadding = parseInt(this.dom.community.getStyle('padding-left')) * 2,
				communityCardWidth = 0,
				communityCardHeight = 0,
				backgroundWidth = 0,
				backgroundHeight = 0;

			communityCardWidth = (communityWidth - ((this.params.dividerWidth * 5) + communityPadding)) / 5;
			communityCardWidth = communityCardWidth < this.params.cardMaxWidth ? communityCardWidth : this.params.cardMaxWidth;
			communityCardHeight = communityCardWidth * 1.5;
			backgroundHeight = communityCardWidth * 13;
			backgroundWidth = communityCardWidth * 14;
			backgroundHeight = communityCardHeight * 4;

			this.dom.communityCards.each(function(card) {
				card.setStyle({
					width: communityCardWidth + 'px',
					height: communityCardHeight + 'px',
					backgroundSize: backgroundWidth + 'px ' + backgroundHeight + 'px'
				});
			});
		},
		setCard: function(position, type) {
			var card = $(position);
			var orders = {
				'A': 0,
				'2': 1,
				'3': 2,
				'4': 3,
				'5': 4,
				'6': 5,
				'7': 6,
				'8': 7,
				'9': 8,
				'T': 9,
				'J': 10,
				'Q': 11,
				'K': 12,
				'X': 13
			},	suits = {
				'H': 0,
				'S': 1,
				'D': 2,
				'C': 3,
				'X': 0
			}

			type = type.split('');

			card.setStyle({
				backgroundPosition: (100 / 13) * orders[type[0]] + '% ' + (100 / 3) * suits[type[1]] + '%'
			});
		}
	});

	return Poker;
});