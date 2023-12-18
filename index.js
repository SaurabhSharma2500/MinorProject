'use strict';

// Loading dependencies & initializing express
var os = require('os');
var express = require('express');
var app = express();
var http = require('http');
var socketIO = require('socket.io');
const fs = require('fs');

app.use(express.static('public'));

app.get("/", function(req, res){
  res.render("index.ejs");
});

app.get("/end", function(req, res){
  res.render("thankyou.ejs");
});

// For SSL Certificate
var server = http.createServer(app);

server.listen(process.env.PORT || 8080);

var io = socketIO(server);

io.sockets.on('connection', function(socket) {
  
    // Convenience function to log server messages on the client.
    // Arguments is an array-like object which contains all the arguments of log().
    // To push all the arguments of log() into an array, use apply().
    function log() {
      var array = ['Message from server:'];
      array.push.apply(array, arguments);
      socket.emit('log', array);
    }

    // Defining Socket Connections
    socket.on('message', function(message, room) {
      log('Client said: ', message);
      // For a real app, would be room-only (not broadcast)
      socket.to(room).emit('message', message, room); // Change to .to() for a room-only message
    });

    socket.on('create or join', function(room) {
      log('Received request to create or join room ' + room);

      var clientsInRoom = io.sockets.adapter.rooms[room];
      var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      log('Room ' + room + ' now has ' + numClients + ' client(s)');

      if (numClients === 0) {
        socket.join(room);
        log('Client ID ' + socket.id + ' created room ' + room);
        socket.emit('created', room, socket.id);
      } else if (numClients === 1) {
        log('Client ID ' + socket.id + ' joined room ' + room);
        io.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room, socket.id);
        io.sockets.in(room).emit('ready');
      } else { // max two clients
        socket.emit('full', room);
      }
    });

    socket.on('ipaddr', function() {
      var ifaces = os.networkInterfaces();
      for (var dev in ifaces) {
        ifaces[dev].forEach(function(details) {
          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
            socket.emit('ipaddr', details.address);
          }
        });
      }
    });

    socket.on('bye', function(){
      console.log('received bye');
    });
});
