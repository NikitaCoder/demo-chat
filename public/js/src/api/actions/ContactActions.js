var AppDispatcher = require('../AppDispatcher');
var ContactApi = require('../utils/ContactApi');

var ContactActions = {

    addContactRequest: function(data){
        AppDispatcher.dispatch({
        eventType: 'preAddContactRequest',
        data: data,
        });
        ContactApi.addContactRequest(data);
    },
    getContacts: function(data){
       AppDispatcher.dispatch({
        eventType: 'loadingContacts',
        data: data,
        });
        ContactApi.getContacts();
    },
    deleteContact: function(data){
        AppDispatcher.dispatch({
        eventType: 'preDeleteContact',
        data: data,
        });
        ContactApi.deleteContact(data);
    },
};

module.exports=ContactActions;