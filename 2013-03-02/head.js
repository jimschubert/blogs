// Begin head.js
var spawn = require('child_process').spawn;
var head = function(path, callback){
	if('function' !== typeof callback) {
		callback = function(d){ };
	}
	
	setTimeout(function(){
		var head = spawn("head", ["-1", path]);
		head.stdout.on("data", callback); 
	}, Math.random() * 1000);
};

module.exports = exports = head;