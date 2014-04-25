var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var NT = require('./lib/nt');
var until = require('./lib/until');
var config = require('./config');

global.basePath = __dirname;

until.buildInfo(config);

var nn = 0;

http.createServer(function(req, res){

	if(req.url == '/favicon.ico') return;

	var pathname = url.parse(req.url).pathname;
	var reqbody = until.queryParse(url.parse(req.url).query) || {};

	var key = reqbody.tpl || 'help';
	var tmp = until.renderHandle(key);

	if(reqbody.index){
		until.writeFile(reqbody, key);
	}

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(tmp);


}).listen(1337, '127.0.0.1');

console.log('running in 127.0.0.1:1337');