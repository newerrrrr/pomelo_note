
//initGame.js 初始化游戏配置, 在 LoginScene.js 中加载 

(function() { 
	window.gt = {} 
	require('config/GameConfig').init(gt);
	require('config/EventType').init(gt);
	require('config/MsgConfig').init(gt);
	require('public/UtilTools').init(gt);
	require('public/DeviceApi').init(gt);

	gt.tcp = require('public/net/NetTcp').init();
	
})();
