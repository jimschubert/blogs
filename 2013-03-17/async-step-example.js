var async = require('async');

async.series([
	function first(done){
		console.log('first');
		done(null, 'first');
	},
	function second(done){
		var x;
		console.log('second');
		if(!x){
			// do something that should set x
		}
		done(null, x);
	},
	function(done){
		console.log('third');
		
		done(null, 'third');
	}
], function(err, results){
	console.log(results);
});

async.waterfall([
	function first(done){
		console.log('first');
		done(null, 'first');
	},
	function second(val, done){
		var x;
		console.log('second has val: %j', val);
		if(!x){
			// do something that should set x
		}
		done(null, x);
	},
	function(val, done){
		console.log('third has val: %j', val);
		
		done(null, 'third');
	}
], function(err, val){
	console.log('callback has val: %j', val)
});