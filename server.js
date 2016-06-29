var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

// basic server
var server = http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;

  // basic router
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

// start the server on port 8080
server.listen(8080);

var listener = io.listen(server);

// send data to client from server
listener.sockets.on('connection', function(socket){
  setInterval(function(){
    socket.emit('date', {'date': new Date()});
  }, 1000);

  // recieve data from client
  socket.on('client_data', function(data){
    process.stdout.write(data.letter);
  });
});