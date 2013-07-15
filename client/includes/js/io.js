var ip = document.getElementById('ip').value;

define(["http://" + ip + ":1337/socket.io/socket.io.js"], function() {
	var socket = io.connect('http://' + ip + ':1337');

	return socket;
});