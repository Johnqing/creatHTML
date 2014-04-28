var fs = require('fs');
var path = require('path');
var until = require('./until');
var NT = require('./nt');

/**
 * 单页生成
 * @param data
 * @constructor
 */
function Single(data, key){
	var fileName = path.join('./dist/'+key, data.url);
	var view = path.join(global.basePath, './tmp/'+key + '.html');
	var content = NT.tpl(view, data);
	fs.writeFile(fileName, content, function(err){
		if(err)
			throw err;
		//buildOver(data.id);
	});
}
/**
 * 列表页生成
 * @param data
 * @constructor
 */
function List(data, key){
	var fileName = path.join('./dist/'+key, 'index.html');
	var view = path.join(global.basePath, './tmp/'+ key + '_list.html');
	var content = NT.tpl(view, {
		info: data
	});
	fs.writeFile(fileName, content, function(err){
		if(err)
			throw err;

		//buildOver(data.id);
	});

	until.writeJSON();
}

/**
 * 根据info.json生成文件
 * @param data
 * @param key
 */
function build(data, key){

	List(data, key);

	data.forEach(function(item){
		if(!item.sList.length){
			return;
		}
		item.sList.forEach(function(i){
			Single(i, key);
		})
	});
}

module.exports = build;