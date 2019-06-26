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
        require('initGame');
    },

    start () {
        
    },

    // update (dt) {},

    onBtnLoginWX:function(){
        cc.log("===== onBtnLoginWX");
    },

    onBtnLoginTel:function(){
        cc.log("===== onBtnLoginTel");
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
                        }, function (para) {
                            console.log("para======================", para);
                        });
                    });                    
                }
            })            
        });
    },

    // loginGateServer:function(host, port, callback) {
    //     pomelo.init({
    //         host : host,
    //         port : port,
    //     }, function (){
    //         var route = 'gate.gateHandler.queryEntry';
    //         pomelo.request(route, {
    //             uid:1234,
    //         }, function(ret) {

    //         }            

    //     });        
    // }



});
