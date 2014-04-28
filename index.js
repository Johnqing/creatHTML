var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var NT = require('./lib/nt');
var until = require('./lib/until');
var change = require('./change');
var add = require('./add');


global.allData = JSON.parse(fs.readFileSync('./dist/info.json', 'utf-8'));

global.basePath = __dirname;

http.createServer(function(req, res){

	if(req.url == '/favicon.ico') return;
	var pathname = url.parse(req.url).pathname;
	var reqbody = until.queryParse(url.parse(req.url).query) || {};

	var key = reqbody.tpl || 'help';
	var template = '';
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
	res.end(template);



}).listen(1337, '127.0.0.1');

console.log('running in 127.0.0.1:1337');