var AppDispatcher = require('../AppDispatcher');
var UserApi = require('../utils/UserApi');

var RegisterActions = {

  register: function(data){
    AppDispatcher.dispatch({
      eventType: 'preRegister',
      data: data
    });
    UserApi.registerUser(data)
  },
  init: function(){
    AppDispatcher.dispatch({
      eventName: 'init-state',
    });
  }
};

module.exports=RegisterActions;