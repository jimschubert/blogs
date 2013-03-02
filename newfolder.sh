#!/usr/bin/env node
var fs = require('fs');
var date = new Date();
var newDir = date.toISOString().split('T')[0];

fs.exists(newDir, function(exists){
    if(exists){
		process.stdout.write(newDir + ' already exists!\n');
		process.exit();
    } else {
        fs.mkdir(newDir, 0700, function(err){
			if(err){
				process.stdout.write(newDir + ' could not be created: ' + err.message + '\n');
				process.exit(1);
			} else {
				process.stdout.write(newDir + ' has been created.\n');
				process.exit();
			}
        });
    }
});