// begin fs-example.js
var fs = require('fs');

// Naive expectation: read files in this directory asynchronously
// and output head -1 and tail -1 for each.
fs.readdir(__dirname, function(err, files){
	if(err){
		console.log('Error reading path %s: %j', __dirname, files);
	} else {
		files.forEach(function(file){
			require('./processor')(file, function(d){
				console.log('Contents for %s are:\n\t%s\n', file, d);
			});
		});
	}
});
// end fs-example.js