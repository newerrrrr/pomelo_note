# CocosCreator-Pomelo-plugin
Cocos Creator客户端Pomelo插件,Cocos Creator 1.5已经测试可用。
支持多连接同时存在,[具体看这个PR](https://github.com/fuhongxue/CocosCreator-Pomelo-plugin/commit/57443b2e7ccdea5c01c841f93aef4de5b2dcfb38)。

# 使用方法
将pomelo-creator-client.js文件导入Cocos Creator的工程目录中，并且在属性检查器中设置为导入为插件

非首次初始化pomelo的时候，一定要等上次的disconnect后再初始化

需要断线重连的，要记得init的时候，传入reconnect参数

# 示例
```
pomelo.init({
    host : host1,
    port : port1
}, function () {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.request(route, {
    }, function () {
        pomelo.disconnect(function () {
            pomelo.init({
                host : host2,
                port : port2,
                reconnect : true
            }, function () {
            })
        });
    })
    
});
```
