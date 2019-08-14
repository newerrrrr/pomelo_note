module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

var handler = Handler.prototype;

handler.login = function(msg, session, next) {
	console.log("======= login...")

	// var redis = app.get('mRedis'); 
	// redis.set('hlbkey', 'hahaha', function(err, rep) {
	// 	console.log('------- redis:' + rep);
	// })

	next(null, {code: 200, msg: 'login server is ok.'});
};
