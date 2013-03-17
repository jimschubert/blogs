var Step = require('step');

Step(
	function(){
		console.log('first');
		
		this();
	},
	
	function(){
		var x = null;
		console.log('second');
		if(!x){
			// do something that should set x
		}
		return x;
	},
	
	function(){
		console.log('third');
	}
)