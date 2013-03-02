// begin example.js
var count = 0;

var doSomethingShared = function(){
	count += 1;
	console.log("Shared call count: %d", count);
};

var doSomethingNotShared = function(){
	console.log("Other modules don't know about me!");
};

module.exports.shared = exports.shared =  doSomethingShared;
module.exports.unshared = exports.unshared =  doSomethingNotShared;