
var DeviceApi = {};

//获取唯一的设备id
//android 获取android id
//ios 获取idfa
DeviceApi.getDeviceId = function(){
    if(gt.isNative()){
        return this.callPlatformApi('getDeviceId','()Ljava/lang/String;')
    }
    else{
        //网页上没有
        return '0'
    }
}

module.exports = DeviceApi;

