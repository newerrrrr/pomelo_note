//玩家表-model

var Player = function(app) {
	this.app = app;
}
module.exports = Player;

//继承自 ModeBase 
var ModeBase = require('./ModeBase');
Player.prototype = new ModeBase(); 

var M = Player.prototype;

M.getPlayerById = function(id) { 
	console.log('---- getPlayerById:' + id);
	console.log('---- color:' + this.color);

	this.saveAll();
} 










