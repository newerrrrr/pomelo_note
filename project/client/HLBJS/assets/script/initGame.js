
//initGame.js 初始化游戏配置, 在 LoginScene.js 中加载 

(function() { 
	window.gt = {} 
	require('config/GameConfig').init(gt);
	require('config/EventType').init(gt);
	require('config/MsgConfig').init(gt);
	
})();
