var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema 
var contactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    contactId: { type: Schema.Types.ObjectId, ref: 'User' },
    confirmed: Boolean,
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports=Contact;