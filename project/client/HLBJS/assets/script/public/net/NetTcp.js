
//网络管理器. 基于 pomelo 封装的 websocket 
var NetTcp = function() {
    this.handlers = {};

    this.registerMsg = function(msgId, target, callback){
        if (msgId == null || msgId == 'undefined') {
            cc.log(' invalid msgId ');
        };

        this.handlers[msgId] = this.handlers[msgId] || [];
        let items = this.handlers[msgId];
        //如果已注册则返回 
        for (let i = 0, len = items.length; i < len; i++) { 
            if (items[i].obj == target && items[i].func == callback) { 
                return;
            }
        }
        items.push({obj:target, func:callback}); 
    };

    this.unregisterMsg = function(msgId, target){ 
        let items = this.handlers[msgId];

        if (items == 'undefined') return;
        for (let i = 0, len = items.length; i < len; i++) { 
            if (items[i].obj == target) { 
                items.splice(i, 1);
                break;
            } 
        } 
    };

    //清楚该对象所有关联信息
    this.unregisterAllMsg = function(target) {
        for (let key in this.handlers) { 
            let items = this.handlers[key];
            for (let i = items.length-1; i >= 0; i--){
                if (items[i].obj == target) {
                    items.splice(i, 1);
                }
            }
        }
    };

    this.params   = {};
    this.callback = null;
    this.connect = function(params, callback){
        this.params = params;
        this.callback = callback;

    };
    
} 



module.exports.init = function() { 
    return new NetTcp(); 
} 
