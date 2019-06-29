
module.exports.init = function(gt){ 
	var api = gt.deviceApi = {};


//获取唯一的设备id
//android 获取android id
//ios 获取idfa
api.getDeviceId = function(){
    if(gt.isNative()){
        return this.callPlatformApi('getDeviceId','()Ljava/lang/String;')
    }
    else{
        //网页上没有
        return '0'
    }
}



}; //init 
