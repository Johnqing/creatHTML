/**
 * 添加模块
 */
var path = require('path');
var NT = require('./lib/nt');
var build = require('./lib/build');
var config = require('./config');

module.exports = function(reqData, key){

	if(!config[key]) throw new Error('请在 config.js 内添加相应的信息！');

	var allData = global.allData;
	allData[key] = allData[key] || [];
	var curData = allData[key];

	var tplData = {};
	if(!curData.length && (!reqData.title && !reqData.id)){
		console.log('init');
		curData = [];
		tplData[key] = null;
	}else{
		if(!reqData.subtitle){
			console.log('not have subtitle');
			var tArr = reqData.title.split('|');

			tArr.forEach(function(item, i){
				curData.push({
					total: 0,
					title: item,
					id: i,
					sList: []
				});
			});

			tplData[key] = {
				id: 0,
				list: curData
			};
		}else{

			console.log('have subtitle');

			var data = curData[reqData.id];
			data.total++;
			data.sList.push({
				subtitle: reqData.subtitle,
				content: reqData.content,
				url: 'single/'+data.total+'.html'
			});

			tplData[key] = {
				id: reqData.id,
				list: curData
			};

			build(allData[key], key);
		}

	}

	console.log(allData);
	// 模板处理
	var filePath = path.join(global.basePath, './view/add.html');
	return NT.tpl(filePath, tplData);
}