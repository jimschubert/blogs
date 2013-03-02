// begin processor.js
var head = require('./head'),
	tail = require('./tail');
	
// don't do this IRL
var callback = null;

var processor = function(file, cb){
	if('function' === typeof cb){
		callback = cb;
	}
	
	// these fail
	head(file, function(d){
		callback(d)
	});
	tail(file, function(d){
		callback(d)
	});
	
	// these succeed
	// head(file, callback);
	// tail(file, callback);
	
	// so do these
	// head(file, function(d){
	// 		cb(d)
	// 	});
	// 	tail(file, function(d){
	// 		cb(d)
	// 	});
};

module.exports = exports = processor;