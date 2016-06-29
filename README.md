# NodeSockets

Server and client communication over sockets.

Install the sockets (ie dependencies) with `npm install` .

Run the server with `npm start`. To keep the server running while modifying code, run the server by typing `nodemon server.js` into the terminal.
* Check that the server is running. Navigate to localhost:8080. You should see a super secret message.

To see the data sent to the client from the server, navigate to localhost:8080/socket.html. The time should be displayed and update dynamically.

To send data from the client to the server, type in the text area. Your text should appear in the terminal window that is running your server.