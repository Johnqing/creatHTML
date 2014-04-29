/**
 * 添加模块
 */
var path = require('path');
var NT = require('./lib/nt');
var build = require('./lib/build');
var config = require('./config');

/*
  * 检测对象是否是空对象(不包含任何可读属性)。
  * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
  */
function isEmpty(obj){
	for (var name in obj){
		return false;
	}
	return true;
};

module.exports = function(reqData, key){

	if(!config[key]) throw new Error('请在 config.js 内添加相应的信息！');

	var allData = global.allData;
	allData[key] = allData[key] || [];
	var curData = allData[key];

	var tplData = {};

	var objIsEmpty = isEmpty(reqData);

	if(objIsEmpty){
		tplData[key] = {
			id: null,
			list: curData
		}
	}else{
		if(!reqData.subtitle){

			if(reqData.id){
				tplData[key] = {
					id: reqData.id,
					list: curData
				};
			}else {
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
			}


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