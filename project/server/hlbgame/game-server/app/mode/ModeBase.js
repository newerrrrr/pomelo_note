
var ModeBase = function() {
	this.color = 'red';
} 
module.exports = ModeBase;


var M = ModeBase.prototype;

M.saveAll = function() {
    console.log('---- saveAll')
}


