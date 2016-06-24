// basic server
var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;

  if(path === '/'){ // if on main page
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('hello world');
    response.end();
  } else if(path === '/socket.html'){
    fs.readFile(__dirname + path, function(err, data){
      if (err){
        response.writeHead(404);
        response.write('sorry, this doesnt exist');
        response.end();        
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data, "utf8");
        response.end();
      }
    });   
  } else {
    response.writeHead(404);
    response.write('sorry, this doesnt exist');
    response.end(); 
  }

});

server.listen(8080);

var listener = io.listen(server);
listener.sockets.on('connection', function(socket){
  // socket.emit('message', {'message': 'its the socket. i heard a connection and I\'m emmiting this message.'});
  setInterval(function(){
    socket.emit('date', {'date': new Date()});
  }, 1000);
});