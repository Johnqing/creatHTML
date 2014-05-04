var fs = require('fs');
var path = require('path');
var logs = require('./log');
var config = require('../config');

//创建目录,如果指定路径中有许多中间的目录不存在,也一并创建它们
/*
 参数
 p为一个目录的路径，以“/”隔开
 */
var mkdirSync = function(p) {
	p = path.normalize(p);
	var array = p.split(path.sep); //创建目录,没有则补上
	for (var i = 0, cur; i < array.length; i++) {
		if (i === 0) {
			cur = array[i];
		} else {
			cur += (path.sep + array[i]);
		}
		try {
			fs.mkdirSync(cur, "0755");
		} catch(e) {}
	}
}

module.exports = {
	mkdirSync: mkdirSync,
	writeJSON: function(){
		// 由于是get请求，所以会造成出现 <a+href="xxx">xx</a>
		// 通过正则分组([<a, +, href="xxx">xx</a>]), 拿到第一个和第三个分组中间加空格区分
		var content = JSON.stringify(global.allData).replace(/(<\w+)(\+)(.*\/\w>)/g, '$1 $3');
		fs.writeFile('./'+config.root+'/info.json', content, function(err){
			if(err) throw err;
			logs.w('全局配置json，写入成功！');
		});
	},
	queryParse: function(queryStr){
		var queryArr, temp;
		if (!queryStr) {
			return '';
		}
		queryArr = queryStr.split('&');
		temp = {};
		queryArr.forEach(function(v, i) {
			var vArr;
			vArr = v.split('=');
			return temp[vArr[0]] = decodeURIComponent(vArr[1]);
		});
		return temp;
	}

}