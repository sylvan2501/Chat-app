//const {v4: uuidv4} = require('uuid');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userDisconnect, getRoomUsers} = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
const botName = 'ChatCord Bot';
///

//run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) =>{
    //let userId = uuidv4();
    const user = userJoin(socket.id,username, room);
    socket.join(user.room);
  //welcome current user
  socket.emit('message', formatMessage(botName,'Welcome to ChatCord!')); 
  //broadcast when a user connects
  socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));
  //send users and room info
  io.to(user.room).emit('roomUsers',  
  {
    room: user.room,
    users: getRoomUsers(user.room)
  });
  });

  //listen for chat message
  socket.on('chatMessage', (msg)=>{
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  //runs when a client disconnects
  socket.on('disconnect', () =>{
    const user = userDisconnect(socket.id);
    if(user){
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
      //send users and room info
      io.to(user.room).emit('roomUsers',  
      {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

}); 
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));