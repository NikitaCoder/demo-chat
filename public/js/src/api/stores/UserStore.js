var AppDispatcher = require('../AppDispatcher');
var ContactStore = require('./ContactStore');
var assign = require('object-assign');
var EventEmitter = require('events');
var socket = require('./Connection');
require('whatwg-fetch');

var user = {};
var UserSocket = false;
var LoggedIn =  false;
var regErrors = false;
var loginError = false;
var formData = false;
var Conversation = {};
var SearchList = [];

function registerUser(json){
    if(json.status){
      user = json.user;
      sessionStorage.setItem('token',json.tok_res);
      sessionStorage.setItem('logged','ok');
      UserSocket = socket.connect(window.location.origin,{query: "user="+sessionStorage.getItem('token')});
      UserSocket.on('connect',socket.deployConnection);
      LoggedIn = true;
      regErrors = false;
      formData = false;
      window.location.href="#/profile";
    }
    else{
      user = null;
      regErrors = json;
    }
}

function loginUser(json){
     if(json.status){
      user = json.user;
      sessionStorage.setItem('token',json.tok_res);
      sessionStorage.setItem('logged','ok'); 
      LoggedIn = true;
      UserSocket = socket.connect(window.location.origin,{query: "user="+sessionStorage.getItem('token')});
      UserSocket.on('connect',socket.deployConnection);
      window.location.href="#/profile";
    }
    else{
      user = null;
      loginError = true;
    }
}

// Search Contacts
function searchContacts(data){
   fetch('/api/searchContacts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem('token'),
                },
                body: JSON.stringify({value: data}),
            }).then(function(res){
                return res.json();
            }).then(function(json){
              if(json.status){
                  SearchList = json.users;
              }
               UserStore.emit('change');
                return json;
            }).catch(function(err){
                return err;
            });
}

// Add Contacts
function addContacts(data){
   fetch('/api/addContact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : JSON.stringify({ contact_id: data})
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      Contacts.push(json.userContact);
      IncomingReq.push(json.incomingReq);
      OutcomingReq.push(json.outcomingReq);
    }
    UserStore.emit('change');
    return json;
  }).catch(function(err){
    return err;
  });
}

// Get Conversation by ID 
function getConversationById(id){
  fetch('/api/getConversationById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : JSON.stringify({ id: id})
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      Conversation[json.conv_id] = json.messages;
    }
    else{
      
    }
    UserStore.emit('change');
    return json;
  }).catch(function(err){
    return err;
  });
}

// Save Image
function saveAvatar(data){
   fetch('/api/saveAvatar', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : data
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      user.avatar = json.avatar;
    }
    else{
      
    }
    UserStore.emit('change');
    return json;
  }).catch(function(err){
    return err;
  });
}

// Global object representing list data and logic
var UserStore = assign(new EventEmitter(),{

  // Accessor method we'll use later
  getUser: function(){
    return user;
  },
  ContactsList: function(){
    return Contacts;
  },
  getIncomingReq: function(){
    return IncomingReq;
  },
  getOutcomingReq: function(){
    return OutcomingReq;
  },
  isLoggedIn: function(){
    return LoggedIn;
  },
  getRequestInfo: function(){
    return RequestInfo;
  },
  getFormData: function(){
    return formData;
  },
  getSearchList: function(){
    return SearchList;
  },  
  getErrors: function(){
    if(regErrors){
      return regErrors;
    }
    else{
      return false;
    }
  },
  getLoginError: function(){
    return loginError;
  },  
  getConversationId: function(){
    var pathId = window.location.href.split('/');
      return pathId[pathId.length-1];
  },
  getMessages: function(){
    var pathId = window.location.href.split('/');
    if(Conversation[pathId[pathId.length-1]]){
      return Conversation[pathId[pathId.length-1]];
    }
    else{
      getConversationById(pathId[pathId.length-1]);
    }
    return [];
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

UserStore.dispatchToken = AppDispatcher.register(function(payload){
  switch(payload.eventType){
    case 'preRegister':
      formData = payload.data;
    case 'register':
      registerUser(payload.data);
      UserStore.emitChange();
      break;
    case 'login':
      loginUser(payload.data);
      UserStore.emitChange();
      break;
    case 'searchContacts':
      searchContacts(payload.data);
      break;
    case 'userChecked':
      LoggedIn = true;
      user = payload.data.user;
      sessionStorage.setItem('logged','ok');
      UserSocket = socket.connect(window.location.origin,{query: "user="+sessionStorage.getItem('token')});
      UserSocket.on('connect',socket.deployConnection);
      UserStore.emitChange();
      break;
    case 'userOut':
      sessionStorage.removeItem('logged');
      sessionStorage.removeItem('token');
      LoggedIn = false;
      window.location.href='#/home';
      UserStore.emitChange();
      break;
    case 'openConversation':
      Conversation[payload.data.conv_id] = payload.data.messages;
      window.location.href='#/conversation/'+payload.data.conv_id;
      UserStore.emitChange();
      break;
    case 'send':
      if(UserSocket){
        UserSocket.emit('conversation:send', payload.data);
      } 
      break;
    case 'newMessage':
       Conversation[payload.data.msg.conv_id].push(payload.data.msg);
       UserStore.emitChange();
       break;
    case 'saveAvatar':
      saveAvatar(payload.data);
      break;
    default:
      return true;
  }
  // Need for Flux promise resolution
  return true;
});

module.exports=UserStore;