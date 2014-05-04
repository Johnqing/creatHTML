var colors = require('colors');

function log(text){
	console.log(text);
}

var logs = {
	out: function(text){
		log(text.blue.bold);
	},
	done: function(text){
		log(text.cyan);
	},
	w: function(text){
		log(text.white)
	},
	warn: function(text){
		log(text.white.yellowBG);
	},
	error: function(text){
		log(text.red);
	}
}

module.exports = logs;