define(["io"], function(socket){
	var send = function(type, data) {
		socket.emit('data', {
			handler: type,
			data: data
		});
	}

	return send;
});