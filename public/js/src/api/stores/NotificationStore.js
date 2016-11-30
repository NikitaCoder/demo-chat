var AppDispatcher = require('../AppDispatcher');
var UserStore = require('./UserStore');
var assign = require('object-assign');
var EventEmitter = require('events');
require('whatwg-fetch');

var Notifications = [];
var Count = "";

function addNotification(data){
    if(data.notif){
        if(Notifications.length >= 4){
            Notifications.pop();
            Notifications.unshift(data.notif);
        }
        else{
            Notifications.unshift(data.notif);
        }
        if(Count){
                Count++;
            }
        else{
            Count = 1;        
        }
    }
}

var NotificationStore = assign(new EventEmitter(),{

    getNotifications: function(){
        return Notifications;
    },
    getCount: function(){
        return Count;
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

NotificationStore.dispatchToken = AppDispatcher.register(function(payload){
  switch(payload.eventType){
    case 'addContactRequest':
        NotificationStore.emitChange();
        break;
    case 'userChecked':
        Notifications = payload.data.notifs.msg;
        Count = payload.data.notifs.count
        console.log(payload.data);
        NotificationStore.emitChange();
        break;
    case 'login':
        Notifications = payload.data.notifs.msg;
        Count = payload.data.notifs.count
        NotificationStore.emitChange();
        break;
    case 'newMessage':
       addNotification(payload.data);
       NotificationStore.emitChange();
       break;
    case 'addContact':
       addNotification(payload.data);
       NotificationStore.emitChange();
       break;
    case 'icomingRequest':
       addNotification(payload.data);
       NotificationStore.emitChange();
       break;
    default: return true;
  }
});

module.exports=NotificationStore;

