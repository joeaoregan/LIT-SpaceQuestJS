/*
	server.js
	Joe O'Regan
	17/01/2020
	Space Quest - Server
*/
const express = require("express");
socketio = require("socket.io");

const port = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
/*
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	console.log('addr: ' + add);
	address = add;
	console.log('fam: ' + fam);
});
*/

const os = require("os");
console.log(
  "Platform: " +
    os.platform() +
    " Architecture: " +
    os.arch() +
    " Hostname: " +
    os.hostname()
);
const dns = require("dns");

// let addr=dns.lookup(os.hostname(), function(err,add,fam){
// 	console.log("Server running on " +add+":"+ port);
// });

app.use(express.static("docs"));

server.listen(port);

const red = "\x1b[31m";
const white = "\x1b[37m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";

console.log(
  `${red}   _________ ${reset}                        ________                          __   
  ${red}/   _____/__________    ____  ____ ${reset}\\_____  \\  __ __   ____   _______/  |_ 
 ${red} \\_____  \\\\____ \\__  \\ _/ ___\\/ __ \\ ${reset}/  / \\  \\|  |  \\_/ __ \\ /  ___/\\   __\\
 ${red} /        \\  |_> > __ \\\\  \\__\\  ___/${reset}/   \\_/.  \\  |  /\\  ___/ \\___ \\  |  |  
${red} /_______  /   __(____  /\\___  >___  >${reset}_____\\ \\_/____/  \\___  >____  > |__|  
${red}         \\/|__|       \\/     \\/    \\/${reset}       \\__>           \\/     \\/        `
);

console.log(
  white + "Server running at " + magenta + "http://localhost:" + port + reset
);
console.log("Press " + cyan + "Ctrl+C" + reset + " to stop the server");
