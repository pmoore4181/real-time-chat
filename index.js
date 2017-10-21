var express = require('express');
var app = express();
var port = 8888;

// Jade settings
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Inform Express where to look for front-end logic


// Route to /
app.get("/", function(req, res){
    res.render("page");
});

// integrate socket.io
// pass ExpressJS server to Socket.io(still on same port)
var io = require('socket.io').listen(app.listen(port));

// Socket.io app beings with 'connection handler'
io.sockets.on('connection', function(socket){
	socket.emit('message', { message: 'Welcome to the chat' });
	socket.on('send', function(data) {
		io.socket.emit('message', data);
	})
})

console.log(`Listening on ${port}`);