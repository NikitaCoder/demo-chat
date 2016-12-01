var AppDispatcher = require('../AppDispatcher');
require('whatwg-fetch');

// Get contacts function
exports.getContacts = () =>{
     fetch('/api/getContacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    }
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      var data = 
      {
          contacts: json.contacts,
          incoming: json.incomingReq,
          outcoming: json.outcomingReq,
      }

      AppDispatcher.dispatch({
        eventType: 'getContacts',
        data: data,
        });
    }
    return json;
}).catch(function(err){
    console.log(err);
    return err;
  });
}

// Add Contact Request
exports.addContactRequest = (data) =>{
  fetch('/api/addRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : JSON.stringify({ contact_id: data._id, nickName: data.nickName})
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
        var request = 
        {
            reqInfo: {
                snackbar: true,
                msg: json.msg,
            },
            contacts: json.contacts,
            outcoming: json.outcoming,
        };
        AppDispatcher.dispatch({
            eventType: 'addContactRequest',
            data: request,
            });
    }
    else{
      
    }
    ContactStore.emit('change');
    return json;
  }).catch(function(err){
    return err;
  });
}

// Delete Contact 
exports.deleteContact = (data) =>{
   fetch('/api/deleteContact', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem('token'),
    },
    body : JSON.stringify(data)
  }).then(function(res){
    return res.json();
  }).then(function(json){
    if(json.status){
      AppDispatcher.dispatch({
            eventType: 'deleteContact',
            data: json,
      });
    }
    else{
      console.log(json);
    }
    UserStore.emit('change');
    return json;
  }).catch(function(err){
    return err;
  });
}