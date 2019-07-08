
//initGame.js 初始化游戏配置, 在 LoginScene.js 中加载 

(function() { 
    window.gt = {} 
    
    require('config/GameConfig').init(gt);
    require('config/EventType').init(gt);
    require('config/MsgConfig').init(gt);
    require('public/utils/UtilTools').init(gt);
    require('public/utils/Debug').init(gt);
    
    gt.deviceApi = require('public/utils/DeviceApi'); 
    gt.wxMgr     = require('public/utils/WxMgr'); 
    gt.tcp       = require('public/net/NetTcp');
    gt.audio     = require('public/utils/AudioMgr');

})();
