var AppDispatcher = require('../AppDispatcher');
var UserStore = require('./UserStore');
var assign = require('object-assign');
var EventEmitter = require('events');
require('whatwg-fetch');


var RequestInfo = {};
var Contacts = [];
var IncomingReq = [];
var OutcomingReq = [];

function contactRequests(data){
  RequestInfo = data.reqInfo;
  if(data.contacts){
    Contacts.push(data.contacts);
    for(let i = 0; i < IncomingReq.length; i++){
      if(data.contacts._id === IncomingReq[i]._id){
        IncomingReq.splice(i,1);
      }
    }
  }
  else if(data.outcoming){
    OutcomingReq.push(data.outcoming);
  }
}

function deleteContact(json){
  for(let i = 0; i < Contacts.length; i++){
        if(json.id === Contacts[i]._id){
          Contacts.splice(i,1);
        }
  }
  for(let i = 0; i < OutcomingReq.length; i++){
       if(json.id === OutcomingReq[i]._id){
          OutcomingReq.splice(i,1);
        }
  }
  for(let i = 0; i < IncomingReq.length; i++){
       if(json.id === IncomingReq[i]._id){
          IncomingReq.splice(i,1);
        }
  }
}


var ContactStore = assign(new EventEmitter(),{
    getRequestInfo: function(){
        return RequestInfo;
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

ContactStore.dispatchToken = AppDispatcher.register(function(payload){
  switch(payload.eventType){
    case 'addContactRequest':
      contactRequests(payload.data);
      ContactStore.emitChange();
      break;
    case 'loadingContacts':
      break;
    case 'getContacts':
      Contacts = payload.data.contacts;
      IncomingReq = payload.data.incoming;
      OutcomingReq = payload.data.outcoming;
      ContactStore.emitChange();
      break;
    case 'deleteContact':
      deleteContact(payload.data);
      ContactStore.emitChange();
      break;
    case 'icomingRequest':
      IncomingReq.push(payload.data.contact);
      ContactStore.emitChange();
      break;
    case 'addContact':
      deleteContact({ id: payload.data.contact._id});
      Contacts.push(payload.data.contact);
      ContactStore.emitChange();
      break;
    default: true;

  }
  // Need for Flux promise resolution
  return true;
});

module.exports=ContactStore;