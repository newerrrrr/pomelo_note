
var time = module.exports;

var moment = require('moment'); //该组件通过命令 npm install moment 来安装
moment.locale('zh-cn');

time.getTimeMilsec = function() {
	return Date.now();
}

//获取日期时间
time.getDatetime = function() {
	return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}

