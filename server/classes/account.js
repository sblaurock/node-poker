define(["lib/inheritance", "send", "redis"], function(i, send, redis){
	var redis = redis.createClient();

	redis.on("error", function(err) {
		console.log("Redis Error " + err);
	});

	var User = Class.extend({
		init: function(username, password, funds, seat) {
			this.username = username;
			this.password = password;
			this.funds = funds;
			this.seat = seat;
			this.status = 'Waiting';
		}
	});

	var Account = Class.extend({
		init: function() {
			this.params = {
				minUsernameLength: 3,
				maxUsernameLength: 12,
				minPasswordLength: 5,
				memberSet: 'users',
				onlineSet: 'online',
				startingFunds: String(Game.getParam('startFunds'))
			},
			this.errors = {
				invalidUsernameLength: 'Sorry, but usernames may only be between ' + this.params.minUsernameLength + ' and ' + this.params.maxUsernameLength + ' characters in length. Update your credentials and try again.',
				invalidPasswordLength: 'Sorry, but passwords must be at least ' + this.params.minPasswordLength + ' characters in length. Update your credentials and try again.',
				invalidPassword: 'Sorry, but the password you entered is incorrect. Update your credentials and try again.'
			},
			this.online = {}
		},
		access: function(username, password, seat, socket, callback) {
			if(username.length < this.params.minUsernameLength || username.length > this.params.maxUsernameLength) {
				send.client(socket, 'Account.error', [ this.errors.invalidUsernameLength ]);
			} else if (password.length < this.params.minPasswordLength) {
				send.client(socket, 'Account.error', [ this.errors.invalidPasswordLength ]);
			} else {
				var that = this;
				var cleanUsername = username.replace(/[^a-zA-Z0-9-]/g, '');

				redis.sismember(this.params.memberSet, cleanUsername, function(err, response) {
					if(response) {
						redis.hget(cleanUsername, 'password', function(err, storedPassword) {
							if(storedPassword === password) {
								redis.hset(cleanUsername, 'socketId', socket.id);
								redis.hset(cleanUsername, 'seat', seat);
								redis.hgetall(cleanUsername, function(err, player) {
									callback(player);
								});
							} else {
								send.client(socket, 'Account.error', [ that.errors.invalidPassword ]);
							}
						});
					} else {
						player = new User(cleanUsername, password, that.params.startingFunds, seat);

						redis.sadd(that.params.memberSet, cleanUsername);
						redis.hmset(cleanUsername, player);

						callback(player);
					}
				});
			}
		},
		updateFunds: function(username, amount) {
			redis.hset(username, 'funds', amount);
		}
	});

	redis.flushall();

	return Account
});