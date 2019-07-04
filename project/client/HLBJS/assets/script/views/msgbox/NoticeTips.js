





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

            //更换按钮图片、文字
            if (btnParas) {                
                if (btnParas.imgOkPath){
                    let sp = btnOk.getComponent(cc.Sprite);
                    cc.loader.loadRes(btnParas.imgOkPath, cc.SpriteFrame, function(err, spriteFrame) {
                        sp.spriteFrame = spriteFrame;
                    });
                };
                if (btnParas.imgCancelPath){
                    let sp = btnCancel.getComponent(cc.Sprite);
                    cc.loader.loadRes(btnParas.imgCancelPath, cc.SpriteFrame, function(err, spriteFrame) {
                        sp.spriteFrame = spriteFrame;
                    });
                };
                if (btnParas.strOk) {
                    btnOk.getChildByName('Label').getComponent(cc.Label).string = btnParas.strOk;
                };
                if (btnParas.strCancel) {
                    btnCancel.getChildByName('Label').getComponent(cc.Label).string = btnParas.strCancel;
                };                
            };

            //自适应高度 
            var lbDesc = imgBg.getChildByName("Label_Tips").getComponent(cc.Label); 
            lbDesc.string = 'dkdd哒哒\n哒哒哒哒\n多多多\n多多多多\n多多\n多多多多\n多方法';
            lbDesc.scheduleOnce(function(){ //需要等下一帧才更新
                cc.log('-----------w,h', lbDesc.node.getContentSize().height)
                let deltaH = lbDesc.node.getContentSize().height - 200;
                if (deltaH > 0) {
                    cc.log('dssssssssssssss', imgBg.height, deltaH)
                    imgBg.height += deltaH;
                    cc.log('dd', imgBg.height)
                    // size.height += deltaH;
                    // imgBg.getComponent(cc.Sprite).setContentSize(size);
                }
            }, 0);
            
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
