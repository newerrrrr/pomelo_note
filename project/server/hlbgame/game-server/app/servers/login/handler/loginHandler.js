
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.login = function(msg, session, next) {
	console.log('========================sdfdfdfdfd ')

	var redis = this.app.get('redisClient');
	console.log('------------redis:' + redis)
	redis.set('hlbkey', 'hlbval', function(err, rep) {
		console.log('------rep:' + rep);

		redis.get('hlbkey', function(err, rep) {
			console.log('----------val:' + rep)
		})
	});
	

	var Player = require('../../../mode/Player');
	var player = new Player(this.app);
	player.getPlayerById(123456);


	next(null, {
		route: 'okkkkkkkkk'
	});
};