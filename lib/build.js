var fs = require('fs');
var path = require('path');
var until = require('./until');
var NT = require('./nt');
var logs = require('./log');
var config = require('../config');

/**
 * 单页生成
 * @param data
 * @constructor
 */
function Single(data, key){
	var fileName = path.join('./'+config.root+'/'+key, data.url);
	var view = path.join(global.basePath, './tmp/'+key + '.html');
	var content = NT.tpl(view, data);
	// 异步写入 会多写入一部分内容，目前没有想到解决方案，暂时先同步写入
	fs.writeFileSync(fileName, content);
	logs.w('文件：' + fileName);
}
/**
 * 列表页生成
 * @param data
 * @constructor
 */
function List(data, key){
	var fileName = path.join('./'+config.root+'/'+key, 'index.html');
	var view = path.join(global.basePath, './tmp/'+ key + '_list.html');
	var content = NT.tpl(view, {
		info: data
	});

	logs.w('文件：' + fileName);

	fs.writeFileSync(fileName, content);
	until.writeJSON();
}
/**
 * 目录生成
 * @param filePath
 * @param key
 */
function mkdir(filePath, key){
	var ex = path.dirname(filePath);
	var p = path.join(global.basePath, './'+config.root+'/'+ key + '/' + ex);
	until.mkdirSync(p);
}

/**
 * 根据info.json生成文件
 * @param data
 * @param key
 */
function build(data, key){
	var logTimeStart = new Date();
	logs.out('==================Start 当前时间:'+logTimeStart+'==============================');
	logTimeStart = +logTimeStart;

	logs.done('\n=============== 列表 start =====================\n');

	List(data, key);

	logs.done('\n=============== 列表 end =====================\n');

	logs.done('\n=============== 单页 start =====================\n');

	data.forEach(function(item, i){
		if(!item.sList.length){
			return;
		}
		// 生成不存在的文件夹
		mkdir(item.sList[0].url, key);
		// 遍历生成单页文件
		item.sList.forEach(function(i){
			Single(i, key);
		})
	});

	logs.done('\n=============== 单页 end =====================\n');

	var logTimeLast = +new Date();
	var useTime = (logTimeLast - logTimeStart)/1000;
	logs.out('==================End 用时:'+ useTime + '秒' +' ==============================');
}

module.exports = build;