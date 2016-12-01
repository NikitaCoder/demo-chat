var AppDispatcher = require('../AppDispatcher');
var UserStore = require('./UserStore');
var assign = require('object-assign');
var EventEmitter = require('events');
require('whatwg-fetch');

var Notifications = [];
var Count = "";

function addNotification(data){
    if(data.notif){
        Notifications.push(data.notif);
        if(Count){
                Count++;
            }
        else{
            Count = 1;        
        }
    }
}

function changeNotificationById(id){
    for(let i = 0; i< Notifications.length; i++){
        if(Notifications[i]._id == id){
            Notifications[i].read = true;
            Count ? Count-- : Count="";
        }
    }
}
function deleteNotification(id){
    for(let i = 0; i< Notifications.length; i++){
        if(Notifications[i]._id == id){
            if(!Notifications[i].read){
                Count ? Count-- : Count="";
            }
            Notifications.splice(i,1);
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
    case 'notificationRead':
        changeNotificationById(payload.data.id);
        NotificationStore.emitChange();
        break;
    case 'notificationDeleted':
        deleteNotification(payload.data.id);
        NotificationStore.emitChange();
        break;
    case 'userChecked':
        Notifications = payload.data.notifs.msg;
        Count = payload.data.notifs.count
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

