var fs = require('fs');
var path = require('path');

module.exports = {
	writeJSON: function(){
		fs.writeFile('./dist/info.json', JSON.stringify(global.allData), function(err){
			if(err) throw err;
		});
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