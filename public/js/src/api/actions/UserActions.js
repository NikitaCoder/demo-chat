var AppDispatcher = require('../AppDispatcher');
var UserApi = require('../utils/UserApi');



var UserActions = {

  getContacts: function(data){
    AppDispatcher.dispatch({
      eventType: 'getContacts',
      data: data,
    });
  },
  getConversations: function(){
    UserApi.getConversations();
  },
  setReadStatus: function(data){
    UserApi.sendRead(data);
  },
  deleteNotification: function(id){
    UserApi.deleteNotification(id);
  },
  searchContacts: function(data){
    AppDispatcher.dispatch({
      eventType: 'searchContacts',
      data: data,
    });
  },
  send: function(data){
    AppDispatcher.dispatch({
      eventType: 'send',
      data: data,
    });
  },
  saveAvatar: function(data){
    AppDispatcher.dispatch({
      eventType: 'saveAvatar',
      data: data
    });
  },
  openConversation: function(data){
    AppDispatcher.dispatch({
      eventType: 'preOpenConversation',
      data: data,
    });
    UserApi.openConversation(data);
  },
};

module.exports=UserActions;