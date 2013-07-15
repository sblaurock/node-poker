define(["io"], function(io){
	var send = {
		all: function(type, data) {
			io.sockets.emit('data', {
				handler: type,
				data: data
			});
		},
		client: function(socket, type, data) {
			socket.emit('data', {
				handler: type,
				data: data
			});
		}
	}

	return send;
});