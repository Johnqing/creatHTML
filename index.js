var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var until = require('./lib/until');
var change = require('./change');
var add = require('./add');
var config = require('./config');
var build = require('./lib/build');
var logs = require('./lib/log');

// 防止info.json没有创建
try{
	var conf = fs.readFileSync('./'+config.root+'/info.json', 'utf-8');
	global.allData = JSON.parse(conf);
} catch (err){
	global.allData = {}
};
/**
 * 目录不存在 自动创建目录
 */
(function(){
	for(var k in config){
		if(k == 'root' || k == 'single') continue;
		var p = path.join(__dirname, './'+config.root+'/'+ k +'/'+config.single);
		until.mkdirSync(p);
	}
})();

global.basePath = __dirname;

// build 所有
(function(){
	for(var k in global.allData){
		build(global.allData[k], k);
	};
})();


http.createServer(function(req, res){
	if(req.url == '/favicon.ico') return;

	var reqbody = until.queryParse(url.parse(req.url).query) || {};

	var key = reqbody.tpl || 'help';
	var template = '';

	logs.out(reqbody.tools);
	// 判断类型 默认为添加
	switch (reqbody.tools){
		case 'change':
			template = change(reqbody, key);
			break;
		default :
			template = add(reqbody, key);
	}

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	template = template.replace(/(<\w+)(\+)(.*\/\w>)/g, '$1 $3');
	res.end(template);



}).listen(1337, '127.0.0.1');

logs.out('127.0.0.1:1337 running！');