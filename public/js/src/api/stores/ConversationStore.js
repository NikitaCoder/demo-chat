var AppDispatcher = require('../AppDispatcher');
var UserStore = require('./UserStore');
var assign = require('object-assign');
var EventEmitter = require('events');
require('whatwg-fetch');

var Conversations = [];

var ConversationStore = assign(new EventEmitter(),{

    getConversations: function(){
        return Conversations;
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

ConversationStore.dispatchToken = AppDispatcher.register(function(payload){
    switch(payload.eventType){
    case 'loadConversations':
        Conversations = payload.data.conversations;
        ConversationStore.emitChange();
        break;
    default: return true;
    }
    return true;
});

module.exports=ConversationStore;