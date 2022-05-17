/*
	server.js
	Joe O'Regan
	17/01/2020
	Space Quest - Server
*/
const express = require('express'),
	http = require('http');
socketio = require('socket.io');

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
/*
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	console.log('addr: ' + add);
	address = add;
	console.log('fam: ' + fam);
});
*/

var os = require('os');
console.log("Platform: " + os.platform() + " Architecture: " + os.arch() + " Hostname: " + os.hostname());
var dns = require('dns');
var address;
var addr=dns.lookup(os.hostname(), function(err,add,fam){
	console.log("Server running on " +add+":"+ port);
	//address=add;
});
//console.log(addr);


app.use(express.static('static'));

var users = [];

//console.log("Server running on " +address+":"+ port);
//console.log("address: " + address);

io.on('connection', (socket) => {
	//socket.broadcast.emit('user.events', {name: 'system', message: 'Someone has joined!'});
	console.log('New User Connected');

	socket.on('newuser', (data) => {
		console.log('new connection from ');

		var nameExists = false;

		for (var i = 0; i < users.length; i++) {
			if (users[i] == data.name) {
				nameExists = true;
				break;
			}
		}

		if (!nameExists) {
			users.push(data.name);
		}

		console.log('Current Users (' + users.length + '): ' + users);
		socket.broadcast.emit('user.events', { name: 'system', message: 'User: ' + data.name + ' has joined the chat. Users: ' + users.length });

		io.emit('update-user-list', users);
	});

	socket.on('updateuser', (data) => {
		var nameChanged = false;

		for (var i = 0; i < users.length; i++) {
			if (users[i] == data.oldname) {
				users[i] = data.newname;
				nameChanged = true;
				break;
			}
		}

		if (nameChanged) {
			console.log('User: ' + data.oldname + ' is now "' + data.newname + '"');
			console.log('Current Users (' + users.length + '): ' + users);
			socket.broadcast.emit('user.events', { name: 'system', message: 'User: ' + data.oldname + ' is now "' + data.newname + '"' });




			io.emit('update-user-list', users);
		}
	});

	socket.on('message', (data) => {
		console.log(data.name, 'says', data.message);
		socket.broadcast.emit('message', data);	// broadcast to everyone except this
	});

	socket.on('disconnect', function () {
		console.log('User has disconnected / reset connection');

		if (users.length > 0) {
			socket.broadcast.emit('user.events', { name: 'system', message: 'Someone has left the chat!' });
		}
	});
});

server.listen(port);