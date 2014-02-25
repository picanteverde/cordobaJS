module.exports = function(io, jm){
	var clients = {};

	io.configure('development', function(){
	  io.set('log level', 0);
	});

io.sockets.on('connection', function (socket) {
	socket.emit('connected', { status: 'ok' });
	jm.on("resp", function(result){
		socket.emit("resp", {result: result});
	});
	

});


};