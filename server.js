var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request, response){
	response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(8080, function(){
	console.log('Running server on port 8080');
});
