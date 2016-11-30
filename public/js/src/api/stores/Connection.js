var io = require('socket.io-client');
var AppDispatcher = require('../AppDispatcher');
var UserStore = require('./UserStore');
var socket;

exports.connect = (url, params) =>{
    if(!socket)
        return socket =  io.connect(url,params);
    else
        return socket;
}

// Connection
exports.deployConnection =  () => {
   
  socket.on('new message',(data) =>{
       console.log('new message');
    UserStore.emit('change');
  });

  socket.on('deleteContact',(id) =>{
      console.log('deleteContact');
    AppDispatcher.dispatch({
      eventType: 'deleteContact',
      data: {
        id : id
      },
    });
  });

  socket.on('add contact',(cont) =>{
      console.log(cont);
      AppDispatcher.dispatch({
      eventType: 'addContact',
      data: cont,
    });
  });

  socket.on('incoming request', (incoming) =>{
      console.log(incoming);
      AppDispatcher.dispatch({
      eventType: 'icomingRequest',
      data: incoming,
    });
  });

  socket.on('server:save message', (data) =>{
      AppDispatcher.dispatch({
      eventType: 'newMessage',
      data: data,
    });
  });
}