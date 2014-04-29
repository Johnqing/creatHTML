var fs = require('fs');
var path = require('path');

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
		fs.writeFile('./dist/info.json', JSON.stringify(global.allData), function(err){
			if(err) throw err;
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