define(["lib/inheritance", "send", "mersenne"], function(i, send, mt){
	var Poker = Class.extend({
		init: function() {
		},
		newDeck: function() {
			var count = 0,
				rand = 0,
				used = [],
				deck = [],
				pointer = 0,
				deckObj = {},
				suit = '',
				order = '',
				suits = {
					0: 'H',
					1: 'S',
					2: 'D',
					3: 'C'
				}, orders = {
					0: 'A',
					1: '2',
					2: '3',
					3: '4',
					4: '5',
					5: '6',
					6: '7',
					7: '8',
					8: '9',
					9: 'T',
					10: 'J',
					11: 'Q',
					12: 'K'
				}

			while(count < 52) {
				rand = mt.rand(52);

				if(!used[rand]) {
					used[rand] = true;

					order = orders[rand % 13];
					suit = suits[Math.floor(rand / 13)];

					deck.push(order + suit);
					count++;
				}
			}

			deckObj = {
				deck: deck,
				pointer: pointer,
				next: function() {
					return deck[pointer++];
				}
			}

			return deckObj;
		}
	});

	return Poker;
});