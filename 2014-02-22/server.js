var port = 2020,
	express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io").listen(server),
	jm = require("./jobsMng.js")(),
	websock = require("./websocketconf.js"),
	appmng = require("./appMang.js");

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express["static"]("public"));
});

io.configure('development', function(){
  io.set('log level', 0);
});

appmng(app,jm);
websock(io,jm);

server.listen(port);
console.log("DemoServer listening in port:" + port);
