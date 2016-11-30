var AppDispatcher = require('../AppDispatcher');
var UserApi = require('../utils/UserApi');

var LoginActions = {

  login: function(data){
    AppDispatcher.dispatch({
      eventType: 'preLogin',
      data: data
    });
    UserApi.loginUser(data);
  },
};

module.exports=LoginActions;