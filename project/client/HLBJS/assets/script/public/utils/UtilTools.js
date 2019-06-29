
module.exports.init = function(gt){ 


/*
** 是否是原生app端
*/
gt.isNative = function() {
    return cc.sys.isNative && jsb;
}

/*
** 是否是Adnroid
*/
gt.isAndroid = function() {
    return cc.sys.os == cc.sys.OS_ANDROID;
}

/*
** 是否是IOS 
*/
gt.isIOS = function() {
    return cc.sys.os == cc.sys.OS_IOS;
}

/*
** 是否是IOS审核版本
*/
gt.isIOSReview = function() {
    if (!gt.isIOS()) {
        return false;
    }
    else {
        return gt.isReview;
    }
}

/*
** 获取设备ID
*/
gt.getDeviceId = function() {
    return gt.deviceApi.getDeviceId();
}

/*
** 手动retain对象。(如果未开启自动管理生命周期时才允许手动操作)
*/
gt.retain = function(obj) {
    if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        obj.retain();
    }
}

/*
** 手动release对象
*/ 
gt.release = function(obj) {
    if (obj && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        obj.release();
    }
}

/*
** 设置常驻节点（为其他场景使用）
** 将Node成为常驻节点，场景切换时不会清除这个节点的内存
** 方便下一个场景可以通过这个节点访问数据
*/
gt.addPersistNode = function(node) {
    cc.game.addPersistRootNode(node);
}

/*
** 移除常驻节点
*/ 
gt.removePersistNode = function(node) {
    cc.game.removePersistRootNode(node)
}

/*
** 保存String数据到本地
*/
gt.saveLocal = function(key, str) {
    key += '';
    str += '';
    cc.sys.localStorage.setItem(gt.encodeString(key), gt.encodeString(str));
}

/*
** 获取本地保存的String数据
*/
gt.getLocal = function(key, defaultStr) {
    key += '';
    var str = cc.sys.localStorage.getItem(gt.decodeString(key));
    if (str) str = gt.decodeString(str);
    if (!str || str.length <= 0) {
        str = defaultStr
    }
    return str;
}

/*
** 删除本地保存的String数据
*/
gt.deleteLocal = function(key) {
    key += '';
    cc.sys.localStorage.removeItem(gt.encodeString(key));
}


/*
** 简单加密字符串
*/
gt.encodeString = function(code) {
    var c = String.fromCharCode(code.charCodeAt(0)+code.length);  
    for(var i=1; i<code.length; i++){  
        c += String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
    } 
    c = escape(c);
    return c;
}

/*
** 简单解密字符串
*/
gt.decodeString = function(code) {
    code = unescape(code);  
    var c = String.fromCharCode(code.charCodeAt(0)-code.length);  
    for(var i=1; i<code.length; i++){  
        c += String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));  
    }  
    return c;  
}

/*
** 绑定参数
** 第一个参数必须是函数类型
*/
gt.bindParams = function() {
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    if (typeof(func) != 'function') return;

    return function() {
      return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  };
}

/*
** 生成任意值到任意值（也就是指定范围内）的随机数
** max期望的最大值
** min期望的最小值
*/
gt.random = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
} 

/*
** string转化成Bytes
*/
gt.stringToBytes = function(str) {  
    var ch, re = []; 
    for (var i = 0; i < str.length; i++ ) { 
        ch = str.charCodeAt(i);  // get char
        var st = [];
        do {  
            st.push( ch & 0xFF );  // push byte to stack  
            ch = ch >> 8;          // shift value down by 1 byte  
        }
        while ( ch );  
        // add stack contents to result  
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() ); 
    }  
    // return an array of bytes  
    return re;  
} 

/*
** 转化 value=n*256+m 为对应的字符串 nm 
*/
gt.jsToCByShort = function(value) {
    var low1 = Math.floor(value / 256);
    var low2 = Math.floor(value % 256);
    return String.fromCharCode(low1, low2);
}

/*
** 转化m+n*2^24+k*2^16+l*2^8=为字符串mnkl
*/
gt.jsToCByInt = function(value) { 
    var low1 = Math.floor(value / (256*256*256));
    var low2 = Math.floor(value / (256*256)) % 256;
    var low3 = Math.floor(value / 256) % 256;
    var low4 = Math.floor(value % 256);
    return String.fromCharCode(low1,low2,low3,low4);
}

/*
** 计算长度
*/
gt.srcSum = function(strData, len) {
    var sum = 65535;
    for (var i=0; i < len; i++) {
        var d = strData[i];
        sum = sum^d;
        if ((sum && 1) == 0) {
            sum = sum / 2;
        }
        else {
            sum = (sum/2)^(0x70B1);
        }
    }
    return sum;
}

/*
** @description 把GPS原始坐标转换成GCJ-02火星坐标
** @param lat 纬度
** @param lng 经度
** @return lat,lng
*/
/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
//function wgs84togcj02(lng, lat) {
gt.convertGPS2GCJ = function(lng, lat) {
    lng = Number(lng);
    lat = Number(lat);

    var PI = 3.1415926535897932384626;
    var a  = 6378245.0;
    var ee = 0.00669342162296594323;

    function transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }
     
    function transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }

    function out_of_china(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }

    // if (out_of_china(lng, lat)) {
    //     return {lat:lat, lng:lng}
    // }
    // else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return {lat:mglat, lng:mglng};
    // }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
gt.gcj02towgs84 = function(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat];
    }
}

/*
** @description 计算两个经纬度点间的距离
** @return 距离（number），千米
*/
gt.getDistanceOfTwoPoint = function(lat1, lng1, lat2, lng2) {
    // AppLog.log(lat1,lng1,lat2,lng2);

    //角度转弧度
    var angleToRadian = function(angle) {
        return angle*Math.PI/180;
    }

    var radlat1 = angleToRadian(lat1);
    var radlat2 = angleToRadian(lat2);;
    var a = radlat1 - radlat2;
    var b = angleToRadian(lng1) - angleToRadian(lng2);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+ Math.cos(radlat1) * Math.cos(radlat2) * Math.pow(Math.sin(b/2),2)));
    var earth_radius = 6378.137;
    distance = distance*earth_radius;
    return Math.abs(distance);
}

/*
** 转化数字为万、亿为单位的字符串
** num需转化的数字
** radix进制
** decimal 小数点后保留位数
** costomunitArr 自定义后缀 ['','W','Y','H']
*/
gt.convertNumToShort = function(num, radix, decimal, costomunitArr) {
    var unitArr = ['', '万', '亿', '万亿'];

    var sign = (num != 0)?num/Math.abs(num):1;  //符号
    num = Math.abs(num);

    //替换自定义后缀
    if(costomunitArr){
        unitArr = costomunitArr;
    }

    radix = (radix == null)?10000:radix; //默认值  10000万亿
    decimal = (decimal == null)?1:decimal; //默认值

    var sum = 0;
    while (num >= radix) {
        sum ++;
        num = num/radix;
    }
    num = Math.floor(num*Math.pow(10, decimal))/Math.pow(10, decimal);
    
    return num*sign + unitArr[sum]; 
}









//自动适配设备
gt.autoAdaptDevices = function () { 
    let canvasNode = cc.find('Canvas'); 
    let canvas = canvasNode.getComponent(cc.Canvas);

    let frameWidth   = canvasNode.width;
    let frameHeight  = canvasNode.height;
    let designWidth  = canvas.designResolution.width;
    let designHeight = canvas.designResolution.height;
    if ((frameWidth/frameHeight) < (designWidth/designHeight)) { //按照宽来适配
        canvas.fitWidth = true;
        canvas.fitHeight = false;
    }
    else { //按照高来适配
        canvas.fitWidth = false;
        canvas.fitHeight = true;
    }

    //适配iPhoneX的刘海
    gt.setAdaptIphoneX();
};

// 适配iphoneX
gt.setAdaptIphoneX = function(nodeName) {
    let canvas = cc.find("Canvas");
    let nameStr = 'node_root'
    if(nodeName){
        nameStr = nodeName
    }
    let nodeRoot = canvas.getChildByName(nameStr);
    
    let func = function() {
        if (nodeRoot) {
            let widget = nodeRoot.getComponent(cc.Widget);
            widget.top    = 0;
            widget.bottom = 0;
            widget.left   = 0;
            widget.right  = 0;
        }
    }; 

    if(cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE){
        let size = cc.view.getFrameSize();
        let isIphoneX = (size.width == 2436 && size.height == 1125)
            ||(size.width == 1125 && size.height == 2436);
        if(isIphoneX){

        }
        else {
            func();
        }
    }
    else {
        func();
    }
};


}; //init
