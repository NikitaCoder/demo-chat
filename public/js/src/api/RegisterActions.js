var AppDispatcher = require('./AppDispatcher');
var UserStore = require('./UserStore');

var RegisterActions = {

  register: function(data){
    AppDispatcher.dispatch({
      eventType: 'register',
      data: data
    });
  },
  init: function(){
    AppDispatcher.dispatch({
      eventName: 'init-state',
    });
  }
};

module.exports=RegisterActions;