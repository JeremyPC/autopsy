var fs = require("fs");

var data = fs.readFileSync('sample.txt');

console.log(data.toString());
console.log("Program Ended");