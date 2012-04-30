var Log = require('./log.js'),
    fs = require('fs');

var level = process.argv[2] || 1;
var logger = new Log(level),
    level = logger.logLevels;

logger.log(level.DEBUG, "This is a debug message");
logger.log(level.INFO, "This is an info message");
logger.log(level.WARN, "This is a warning message");
logger.log(level.ERROR, "This is an error message");

var debugStream = fs.createWriteStream('./debug.txt');
var infoStream = fs.createWriteStream('./info.txt');
var warnStream = fs.createWriteStream('./warn.txt');
var errorStream = fs.createWriteStream('./error.txt');

logger.streams.debug = debugStream;
logger.streams.info = infoStream;
logger.streams.warn = warnStream;
logger.streams.error = errorStream;

logger.log(level.DEBUG, "This is a debug message");
logger.log(level.INFO, "This is an info message");
logger.log(level.WARN, "This is a warning message");
logger.log(level.ERROR, "This is an error message");

debugStream.end();
infoStream.end();
warnStream.end();
errorStream.end();
