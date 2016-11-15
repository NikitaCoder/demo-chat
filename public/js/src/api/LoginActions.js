var AppDispatcher = require('./AppDispatcher');

var LoginActions = {

  login: function(data){
    AppDispatcher.dispatch({
      eventType: 'login',
      data: data
    });
  }
};

module.exports=LoginActions;