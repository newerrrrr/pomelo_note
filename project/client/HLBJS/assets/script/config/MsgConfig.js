//消息定义
module.exports.init = function(globalVar){ 
    var MSGID   = globalVar.MSGID = {};
    
    MSGID.LOGIN  = 1001;
    MSGID.LOGOUT = 1002; 
};