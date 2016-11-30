var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema 
var messageModel = new Schema({
    conv_id: Schema.ObjectId,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
  //  recipient: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Number,
    text: String,
    file: String,
    read: Boolean,
});

var Message = mongoose.model('Message', messageModel);

module.exports=Message;