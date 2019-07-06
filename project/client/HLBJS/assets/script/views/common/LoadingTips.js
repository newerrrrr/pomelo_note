// loading等待框

//timeout:超时自动销毁
//delay:UI延迟显示, 要求 delay < timeout 
module.exports.init = function(gt){ 
    var timeoutId = null,

    gt.showLoadingTips = function(tipsText, timeout, delay) { 
        if (cc.director.getScene().getChildByName('LoadingTips')) {
            cc.log('-----already exist LoadingTips');
            return 
        }

        cc.loader.loadRes('prefab/LoadingTip', function(err, prefab) {
            if (err) return;

            let node = cc.instantiate(prefab);
            node.name = 'LoadingTips';
            node.position = gt.center;
            cc.director.getScene().addChild(node);

            let lbTips = node.getChildByName('lb_wait')
            if (tipsText) {
                lbTips.getComponent(cc.Label).string = tipsText;
            };

            if (timeout) {
                timeoutId = setTimeout(function(){
                    gt.removeLoadingTips();
                }.bind(this), timeout);
            };

            if (delay) {
                node.active = false;
                setTimeout(function() {
                    node.active = true;   
                }, delay)
            }
        } 
    }

    gt.removeLoadingTips = function() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null; 
        }

        let node = cc.director.getScene().getChildByName('LoadingTips');
        if (node) {
            node.destroy();
        }
    }
}
