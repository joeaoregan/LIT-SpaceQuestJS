/*
	server.js
	Joe O'Regan
	17/01/2020
	Space Quest - Server
*/
const express = require('express');
socketio = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
/*
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	console.log('addr: ' + add);
	address = add;
	console.log('fam: ' + fam);
});
*/
console.log(
	`   _________                         ________                          __   
  /   _____/__________    ____  ____ \\_____  \\  __ __   ____   _______/  |_ 
  \\_____  \\\\____ \\__  \\ _/ ___\\/ __ \\ /  / \\  \\|  |  \\_/ __ \\ /  ___/\\   __\\
  /        \\  |_> > __ \\\\  \\__\\  ___//   \\_/.  \\  |  /\\  ___/ \\___ \\  |  |  
 /_______  /   __(____  /\\___  >___  >_____\\ \\_/____/  \\___  >____  > |__|  
         \\/|__|       \\/     \\/    \\/       \\__>           \\/     \\/        `);

const os = require('os');
console.log("Platform: " + os.platform() + " Architecture: " + os.arch() + " Hostname: " + os.hostname());
const dns = require('dns');

let addr=dns.lookup(os.hostname(), function(err,add,fam){
	console.log("Server running on " +add+":"+ port);
});

app.use(express.static('static'));

server.listen(port);