

module.exports.init = function(gt){
    //游戏ID
    var GameID = gt.GameID = {};
    GameID.ZZMJ = 1;
    GameID.NZMJ = 2; 


    //gate服务器
    gt.gateServer = { ip:'192.168.198.128', port:3014};

    
    //是否IOS审核版本
    gt.isReview   = false;
    
    //调试模式
    gt.debug      = true;
    
    //游客登陆
    gt.open_guest = true;
    
};
