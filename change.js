/**
 * Created by liuqing on 14-4-28.
 */
var path = require('path');
var NT = require('./lib/nt');
var build = require('./lib/build');
var logs = require('./lib/log');

function clearTempData(data){
	delete data.isSid;
	delete data.sid;
}

module.exports = function(reqData, key){
	var aData = global.allData;
	var index = reqData.id ? (+reqData.id) : 'undefined';
	var isIndex = index != 'undefined'
	var sid = reqData.sid ? (+reqData.sid) : 'undefined';
	var isSid = sid != 'undefined'

	if(reqData.content){
		var data2 = aData[key][index],
			subData2 = data2.sList[sid];

		delete subData2.title;
		delete subData2.id;
		clearTempData(data2);
		clearTempData(subData2);

		subData2.subtitle = reqData.subtitle;
		subData2.content = reqData.content;

		console.log(data2);
		build(aData[key], key);

		return '修改成功！'
	}

	var obj = {}
	obj[key] = aData[key]
	var data = isIndex ? aData[key][index] : obj;

	data = isIndex && isSid ? aData[key][index].sList[sid] : data;

	data.isSid = isSid;
	data.sid = sid;
	data.id = index;

	if(reqData.id && reqData.title){
		data.title = isIndex && reqData.title;
	} else {
		data.title = isIndex && aData[key][index].title;
	}
	logs.out('change data is done!');
	// 模板处理
	var filePath = path.join(global.basePath, './view/change.html');
	return NT.tpl(filePath, data);
}