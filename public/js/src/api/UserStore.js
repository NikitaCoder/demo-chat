var AppDispatcher = require('./AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events');
require('whatwg-fetch');


var items = [];
var LoggedIn = false;

function registerUser(data){
    fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
    console.log(json);
    //RegisterStore.emit('change');
    return json;
}).catch(function(err){
    return err;
  });
}

function loginUser(data){
    fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
    console.log(json);
    //RegisterStore.emit('change');
    return json;
}).catch(function(err){
    return err;
  });
}

// Global object representing list data and logic
var UserStore = assign(new EventEmitter(),{

  // Accessor method we'll use later
  getAll: function(){
    return items;
  },
  isLoggedIn: function(){
    return LoggedIn;
  },
  emitChange: function(){
    this.emit('change');
  },

  addChangeListener: function(callback){
    this.on('change',callback);
  },

  removeChangeListener: function(callback){
    this.removeListener('change',callback);
  }
});
//initiateData();

UserStore.dispatchToken = AppDispatcher.register(function(payload){
  switch(payload.eventType){
    case 'register':
      registerUser(payload.data);
      console.log(payload.data);
     // RegisterStore.emitChange();
      break;
    case 'login':
      loginUser(payload.data);
      console.log(payload.data);
      break;
  }
  // Need for Flux promise resolution
  return true;
});

module.exports=UserStore;