var fs = require('fs');
var path = require('path');

var NT = require('./nt');

var info = JSON.parse(fs.readFileSync('./dist/info.json', 'utf-8'));


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

}

module.exports = {
	buildInfo: function(config){
		for(var i in config){
			if(!info[i]) {
				info[i] = [];
				for(var k=0; k<config[i].info.length; k++){
					info[i].push({
						"total": 0,
						"title": config[i].info[k],
						"id": k,
						"sList": []
					});
				}
			}
		}
	},
	renderHandle: function(key){
		var obj = {
			list: info[key]
		}

		var filePath = path.join(global.basePath, './view/add.html');
		return NT.tpl(filePath, obj);
	},
	writeFile: function(data, key){
		var index = data.index;
		var cont = info[key][index]

		var total = ++cont.total;
		var url = 'single/' + total + '.html';
		var content = data.content.replace(/\n/g, '<br>');

		cont.total = total;

		var _data = {
			subtitle: data.subtitle,
			content: content,
			url: url
		}

		cont.sList.push(_data);

		fs.writeFile('./dist/info.json', JSON.stringify(info), function(err){
			if(err) throw err;
		});

		Single(_data, key);
		List(info[key], key);


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