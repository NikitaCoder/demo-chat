var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema 
var conversationModel = new Schema({
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var Conversation = mongoose.model('Conversation', conversationModel);

module.exports=Conversation;