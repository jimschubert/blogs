// begin tail.js
var spawn = require('child_process').spawn;
var tail = function(path, callback){
	if('function' !== typeof callback) {
		callback = function(d){ };
	}
	
	setTimeout(function(){
		var tail = spawn("tail", ["-1", path]);
		tail.stdout.on("data", callback); 
	}, Math.random() * 1000);
};

module.exports = exports = tail;