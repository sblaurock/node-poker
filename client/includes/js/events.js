define(["prototype"], function(Prototype) {

	// Chat events.
	Chat.dom.send.observe('click', function() {
		Chat.send();
	});
	Chat.dom.message.observe('keyup', function(e) {
		var key = e.charCode || e.keyCode;

		if(key === Event.KEY_RETURN) {
			Chat.send();
		}
	});

	// Account events.
	Account.dom.player.invoke('observe', 'click', function(e) {
		var target = e.target || e.srcElement;

		if(target.hasClassName(Account.claimClass)) {
			Account.show(this.identify());
		}
	});
	Account.dom.close.observe('click', function() {
		Account.hide();
	});
	Account.dom.access.observe('click', function() {
		Account.access();
	});
	Account.dom.password.observe('keyup', function(e) {
		var key = e.charCode || e.keyCode;

		if(key === Event.KEY_RETURN) {
			Account.access();
		}
	});

	// Poker events.
	Event.observe(window, 'resize', function() {
		Poker.resizeCards();
	});

	// Action events - REWRITE THIS SECTION.
	$$('.selector').invoke('observe', 'click', function(e) {
		var target = e.target || e.srcElement;

		$$('.selector').each(function(selector) {
			selector.innerHTML = '';
		});

		target.innerHTML = '<div id="selected"></div>';
	});

});