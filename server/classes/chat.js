define(["lib/inheritance", "send"], function(i, send){
	var Chat = Class.extend({
		init: function() {
			this.params = {
				messageLimit: 255
			}
		},
		message: function(message, socket) {
			var type = 'message';

			if(message.match(/^\/me\ /)) {
				type = 'self';
				message = message.replace(/^\/me\ /, '');
			}

			if(message.length > this.params.messageLimit) {
				message = message.substring(0, this.params.messageLimit) + '...';
			}

			message = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

			var username = Game.online[socket.id] ? Game.online[socket.id] : 'Guest-' + (socket.id).replace(/[^a-zA-Z0-9]/g, '').substring(0, 5);

			send.all('Chat.add', [ type, { username : username, message : message } ]);
		}
	});

	return Chat;
});