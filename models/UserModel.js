var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema 
var userSchema = new Schema({
    id: Schema.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: String,
    register_date: Number,

});

var User = mongoose.model('User', userSchema);

module.exports=User;