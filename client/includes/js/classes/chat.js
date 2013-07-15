define(["prototype", "send"], function(Prototype, send) {
	var Chat = Class.create({
		initialize: function() {
			this.dom = {
				content: $('chat-messages'),
				message: $('message'),
				send: $('send')
			}
			this.messageFormat = '<div id="last" class="{counter}"><p><b>{username}</b>: {message}</p></div>';
			this.systemFormat = '<div id="last" class="system {counter}"><p><i>{message}</i></p></div>';
			this.selfFormat = '<div id="last" class="self {counter}"><p><i>{username} {message}</i></p></div>';
			this.counter = 0;
		},
		clear: function() {
			this.counter = 0;
			this.dom.content.innerHTML = '';
		},
		format: function(format, content) {
			content.counter = this.counter % 2 ? 'odd' : 'even';
			content = new Hash(content);

			content.each(function(item) {
				format = format.replace('{' + item.key + '}', item.value);
			});

			this.counter = this.counter + 1;

			return format;
		},
		add: function(type, content) {
			if(type == 'system') {
				var format = this.systemFormat;
			} else if (type == 'self') {
				var format = this.selfFormat;
			} else {
				var format = this.messageFormat;
			}

			var messageString = this.format(format, content);

			if(this.dom.content.lastChild != null) {
				this.dom.content.lastChild.id = '';
			}

			this.dom.content.innerHTML = this.dom.content.innerHTML + messageString;
			this.dom.content.scrollTop = this.dom.content.scrollHeight;
		},
		send: function() {
			if(this.dom.message.value === '/clear') {
				this.clear();
			} else if(this.dom.message.value.length > 0) {
				send('Chat.message', [ this.dom.message.value ]);
			}

			this.dom.message.value = '';
			this.dom.message.focus();
		}
	});

	return Chat;
});