/**
 * Created by liuqing on 14-4-28.
 */
var path = require('path');
var NT = require('./lib/nt');
var build = require('./lib/build');

module.exports = function(reqData, key){
	var aData = global.allData;
	var index = +reqData.id;
	var isIndex = index != 'undefined'
	var sid = +reqData.sid;
	var isSid = sid != 'undefined'

	if(reqData.content){
		var data = aData[key][index];
		data.title = reqData.title;
		data.content = reqData.content;
		data.sList[sid].subtitle = reqData.subtitle;
		data.sList[sid].content = reqData.content;
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
	data.title = aData[key][index].title;

	console.log(isSid, isIndex, data);


	// 模板处理
	var filePath = path.join(global.basePath, './view/change.html');
	return NT.tpl(filePath, data);
}