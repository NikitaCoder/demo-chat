var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema 
var notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    subject: String,
    text: String,
    read: Boolean,
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports=Notification;