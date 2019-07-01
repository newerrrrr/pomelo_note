// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnWX:cc.Button,
        btnTel:cc.Button,
        btnGuest:cc.Button,
        editbox:cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        require('InitGame'); //初始化游戏配置

        gt.autoAdaptDevices();
    },

    start () {
    },


    // update (dt) {},

    onBtnLoginWX:function(){
        cc.log("===== onBtnLoginWX");
    },

    onBtnLoginTel:function(){
        cc.log("===== onBtnLoginTel");
        // let obj = {a:'kkdd', b:'isdf'};

        gt.captureScreen('hlb.png', this, null, null, false);

        
    },

    onBtnLoginGuest:function(){
        cc.log("===== onBtnLoginGuest, name =", this.editbox.string);
        cc.log("=============gameid, zzmj=", gt.GameID.ZZMJ, gt.EventType.ZZMJ, gt.MSGID.LOGIN);
        cc.log("=================gate:", gt.gateServer.ip, gt.gateServer.port);

        pomelo.init({
            host : gt.gateServer.ip,
            port : gt.gateServer.port,
        }, function () {
            var route = 'gate.gateHandler.queryEntry';
            pomelo.request(route, {
                username:"huanglibo",
                uid:1234,
            }, function (data) {
                console.log("data======================", data.host, data.port);
                if ('undefined' != data || null != data) {
                    pomelo.disconnect(function () {
                        pomelo.init({
                            host : data.host,
                            port : data.port,
                            reconnect : true
                        }, function () {                            
                            var route = 'login.loginHandler.login';
                            pomelo.request(route, {}, function(para) {
                                console.log("para======================", para.msg);
                            });
                        });
                    });                    
                }
            })  
        });
    },
});
