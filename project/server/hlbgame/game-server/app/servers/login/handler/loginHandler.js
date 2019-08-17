
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
	

	// var Player = require('../../../mode/Player');
	// var player = new Player(this.app);
	// player.getPlayerById(123456);

	var timeUtil = require('../../../util/timeUtil');

	// var mysql = require('mysql');
	// console.log('================mysql:' + mysql);

	// var config = {
	// 	host     : 'localhost',
	// 	user     : 'root',
	// 	password : '11612380',
	// 	port: '3306',                   
	// 	database: 'hlbdb' 
	// }
	// var connection = mysql.createConnection(config);
 //  	connection.connect();
 	var config = this.app.get('mysqlCfg');
 	console.log('-----------config: ' + config);
 	console.log('--------------time:' + new Date())
 	var connection = this.app.get('mysqlClient');

  	var sql = 'INSERT INTO Player(nick, create_time) VALUES("刘5",\' '  + timeUtil.getDatetime() + '\')';
  	connection.query(sql, ['菜鸟'], function(err, result) {
	 	if(err){
         console.log('[INSERT ERROR] - ', err.message);
         return;
        } 
        console.log('INSERT ID:', result);
  	})


	// var sql = 'INSERT INTO Player(nick) VALUES(刘三)';
	// var mysql = this.app.get('mysqlClient');
	// console.log('=================== mysql' + mysql);

	// mysql.query(sql, ['test'], function(err, result) { 
	//  	if(err){
	// 		console.log('[INSERT ERROR] - ',err.message);
	// 		return;
 //        }
	// 	console.log('INSERT ID:', result);
	// })




	next(null, {
		route: 'okkkkkkkkk'
	});
};