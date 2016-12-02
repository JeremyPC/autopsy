var express = require("express");
var app = express();

console.log("requires complete.");

app.get("/",function(req,res){
        res.send("<h1>Hello from EC2</h1>");
});

console.log("get complete.");

app.listen(80);

console.log("listen complete.");