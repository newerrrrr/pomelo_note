





var NoticeTips = { 
    //btnParas: 更换按钮图片和文字 {isPlist:true/false, imgOkPath:'', imgCancelPath:'', strOk:'', strCancel:''}  
    show:function(tips, okFunc, cancelFunc, isSingleBtn, btnParas) {
        var self = this;
        cc.loader.loadRes('prefab/NoticeTips', function(err, prefab) {
            if (err) return;

            var node = cc.instantiate(prefab);
            node.position = gt.center;
            cc.director.getScene().addChild(node);

            //初始化
            var imgBg     = node.getChildByName("Img_bg"); 
            var lbDesc    = imgBg.getChildByName("Label_Tips"); 
            var nodeBot   = imgBg.getChildByName("node_bot") 
            var btnOk     = nodeBot.getChildByName("Btn_ok"); 
            var btnCancel = nodeBot.getChildByName("Btn_cancel"); 
            gt.addClickEvent(btnOk, function(){ 
                node.destroy();
                okFunc && okFunc();
            }, self); 

            gt.addClickEvent(btnCancel, function(){
                node.destroy();
                cancelFunc && cancelFunc();
            }, self); 

            //如果单个按钮则隐藏取消按钮
            if (isSingleBtn) { 
                btnCancel.active = false;
                btnOk.x = 0;
            };

            //更换按钮资源
            if (btnParas) {                
                if (btnParas.imgOkPath){
                    var sp = btnOk.getComponent(cc.Sprite);
                    sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(btnParas.imgOkPath));
                };
                if (btnParas.imgCancelPath){
                    var sp = btnCancel.getComponent(cc.Sprite);
                    sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(btnParas.imgCancelPath));
                };
                if (btnParas.strOk) {

                };
                if (btnParas.strCancel) {

                };                
            };

            //自适应高度 

        }); 


    }, 



};

module.exports = NoticeTips;



// cc.Class({
//     extends: cc.Component,

//     properties: {
//     }, 

//     // LIFE-CYCLE CALLBACKS:

//     onLoad () {
//         cc.log('==========load prefab')
//         var self = this
//         cc.loader.loadRes('prefab/NoticeTips', function(err, prefab) {
//             var newNode = cc.instantiate(prefab);
//             self.initUI(newNode);
//             cc.director.getScene().addChild(newNode);            
//         });
//     },

//     start () {

//     },

//     // update (dt) {},

//     initUI:function(root){
//         var imgBg = root.getChildByName("Img_bg");
//         var lbDesc = imgBg.getChildByName("Label_Tips"); 
//         var btnOk = imgBg.getChildByName("node_bot").getChildByName("Btn_ok");
//         var btnCancel = imgBg.getChildByName("node_bot").getChildByName("Btn_cancel");
//         gt.addClickEvent(btnOk, this.onBtnOk, this); 
//         gt.addClickEvent(btnCancel, this.onBtnCancel, this); 
//     },

//     onBtnOk:function() {
//         cc.log('--------------ok')
//     }, 

//     onBtnCancel:function(){

//     }
// });
