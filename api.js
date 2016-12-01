module.exports= function(io){

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const multer  = require('multer');
const crypto = require('crypto');
const mime = require('mime');
var users = require('./routes/users');

var avatarStorage = multer.diskStorage({
        destination: 'public/uploads/avatars',
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
        }
    });

const cert = fs.readFileSync('public.key').toString();

var User = require('./models/UserModel');
var Contact = require('./models/ContactModel');
var Conversation = require('./models/ConversationModel');
var Notification = require('./models/NotificationModel');
var Message = require('./models/MessageModel');
var ObjectId = require('mongoose').Types.ObjectId; 

 // Use native promises
mongoose.Promise = global.Promise;

// connect mogodb
mongoose.connect('mongodb://user:qwerty11@ds115918.mlab.com:15918/one_more_demo');

// bearerToken
router.use(bearerToken());

// User Login 
router.post('/login', (req,res) =>{
    req.checkBody('email', 'E-mail is not valid').notEmpty().isEmail();
    req.checkBody('password', 'Minimum 8 symbols').minLength(8);
    var errors = req.validationErrors(true);
    
    if(errors){
        res.send(JSON.stringify({error: 'Invalid email or password'}));
    }
    else{
         User.findOne({ email: req.body.email}, (err,user)=>{
             if(err){
                 console.log(err);
             }
             else{
                  if(!user){
                res.send(JSON.stringify({error: 'Invalid email or password'}));
            }
                else{
                    if(bcrypt.compareSync(req.body.password, user.password)){
                            var token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                    data: { email: user.email, id: user._id, nickName: user.nickName } }, cert);
                            Notification.count({userId: ObjectId(user._id), read:false},(err,count) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    Notification.find({userId: ObjectId(user._id)}).exec((err,notifs) =>{
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                              res.send(JSON.stringify({
                                                user: {
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    nickName: user.nickName,
                                                    email: user.email,
                                                    register_date: user.register_date,
                                                    id: user._id,
                                                    avatar: user.avatar,
                                                },
                                                notifs: { count: count, msg: notifs},
                                                status: true,
                                                tok_res: token,
                                                }));
                                        }
                                        });
                                    
                                }
                            });
                    }else{
                        res.send(JSON.stringify({error: 'Invalid email or password'}));
                    }
                }
             }
        });
    }   
});

// User Registration
router.post('/register', (req,res) => {
    req.checkBody('firstName', 'Only letters').notEmpty().isAlpha();
    req.checkBody('lastName', 'Only letters').notEmpty().isAlpha();
    req.checkBody('nickName', 'Need to be filled').notEmpty();
    req.checkBody('email', 'E-mail is not valid').notEmpty().isEmail();
    req.checkBody('password', 'Minimum 8 symbols').minLength(8);
    var errors = req.validationErrors(true);
    
    if(errors){
        console.log(errors);
        res.send(errors);
    }
    else{
        var regTime = new Date().getTime();
        var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: req.body.nickName,
            email: req.body.email,
            password: hash,
            avatar: "",
            register_date: regTime,
        });

        newUser.save((err,user) =>{
            if(err){
                console.log(err);
            }
            else{
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: { email: user.email, id: user._id, nickName: user.nickName } }, cert);
                res.send(JSON.stringify({
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        nickName: user.nickName,
                        email: user.email,
                        register_date: user.register_date,
                        id: user._id,
                        avatar: user.avatar,
                    },
                    status: true,
                    tok_res: token,
        }));
            }
        });
    }
});
// Search User 
// db.users.find({"name": /.*m.*/})
// case insensetive db.users.findOne({"username" : /.*son.*/i});

router.post('/searchContacts',(req,res) =>{
     jwt.verify(req.token, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            res.send(false);
        }
        else{
            User.find({ $and : [ {"nickName" : {'$regex': '.*'+req.body.value+'.*',  $options: 'i'}}, { "nickName" : { $not : new RegExp(decoded.data.nickName) }}]},'nickName avatar',(err, users) =>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(JSON.stringify({
                        status: true,
                        users: users,
                    }));
                }
            });
        }
     });
});

// Set Notification Read true
router.post('/setNotificationRead',(req,res) =>{
    jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
        //console.log(req.body);
       Notification.update({_id: ObjectId(req.body.id)},{ read : true},(err)=>{
           if(!err){
               res.send(JSON.stringify({
                    status: true,
                    id : req.body.id,
                }));
           }
       })
    }
    });
});

// Check User 
router.post('/checkUser',(req,res) => {
  jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
         User.findOne({ email: decoded.data.email}, (err,user)=>{
        if(!user){
            res.send(false);
        }
        else{
            Notification.count({userId: ObjectId(user._id), read:false},(err,count) =>{
                if(err){
                    console.log(err);
                }
                else{
                        Notification.find({userId: ObjectId(user._id)}).exec((err,notifs) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                  res.send(JSON.stringify({
                                    user: {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        nickName: user.nickName,
                                        email: user.email,
                                        register_date: user.register_date,
                                        id: user._id,
                                        avatar: user.avatar,
                                    },
                                    notifs : { count: count, msg: notifs},
                                    status: true,      
                                }));  
                            }
                        })    
                }
            })
          
        }
        });
    }
  });
});

// Get all conversations
router.post('/getConversations',(req,res) =>{
    jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
        Conversation.find({members: {$all : [ObjectId(decoded.data.id)]}}).populate('members').exec((err,convs) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send(JSON.stringify({
                    status: true,
                    conversations: convs,
                }));
            }
        });
    }
    });
});

// get Conversation By Id
router.post('/getConversationById',(req,res)=>{
    jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
        var conv_name = decoded.data.nickName + '_' + req.body.with;
        Conversation.findOne({_id: ObjectId(req.body.id)}, (err, conv) =>{
            if(err){
                console.log(err);
                res.send(false);
            }
             if(conv){
                Message.find({conv_id: conv._id}).sort({date: 1}).limit(20).populate('author').exec((err,mess)=>{
                    if(err){
                        console.log(err);
                    }
                    if(mess){
                         res.send(JSON.stringify({
                                        status: true,
                                        conv_id: conv._id,
                                        messages: mess,
                                    }));
                    }
                });
             }
        });
    }
    });
});

// Save avatar 
router.post('/saveAvatar', multer({storage: avatarStorage}).any() ,(req,res) =>{
    jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
        User.update({ _id: ObjectId(decoded.data.id)},{avatar: req.files[0].filename}, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(JSON.stringify({
                    status: true,
                    avatar: req.files[0].filename,
                }));
            }
        });
    }
    });
});

// Open Conversation
router.post('/openConversation',(req,res) =>{
    jwt.verify(req.token, cert, function(err, decoded) {
    if(!decoded || !decoded.data){
      res.send(false);
    }
    else{
        var conv_name = decoded.data.nickName + '_' + req.body.with;
        Conversation.findOne({$and : [{members: {$all: [ObjectId(decoded.data.id), ObjectId(req.body.with_id)]}}, {"members": {$size: 2}}]}, (err, conv) =>{
            if(err){
                console.log(err);
                res.send(false);
            }
             if(conv){
                Message.find({conv_id: conv._id}).sort({date: 1}).limit(20).populate('author').exec((err,mess)=>{
                    if(err){
                        console.log(err);
                    }
                    if(mess){
                         res.send(JSON.stringify({
                                        status: true,
                                        conv_id: conv._id,
                                        messages: mess,
                                    }));
                    }
                    else{
                        res.send(JSON.stringify({
                                        status: true,
                                        conv_id: conv._id,
                                        messages: [],
                                    }));
                    }
                   
                });
             }
             else{
                 Contact.count({userId: decoded.data.id, contactId: req.body.with_id}, (err, c)=>{
                     if(err){
                         console.log(err);
                         res.send(false);
                     }
                     else{
                         if(!c){
                             res.redirect('/');
                         }
                         else{
                                newConv = new Conversation({
                                name: conv_name,
                                members: [ decoded.data.id, req.body.with_id],
                            });
                            newConv.save((err,conv) =>{
                                if(err){
                                    console.log(err);
                                    res.send(false);
                                }
                                else{
                                    res.send(JSON.stringify({
                                        status: true,
                                        conv_id: conv._id,
                                        messages: [],
                                    }));
                                }
                            });
                         }
                     }
                 });
                
             }
           
            });  
        }
    });
});

//Get Contacts List 
// var ObjectId = require('mongoose').Types.ObjectId; 
// var query = { campaign_id: new ObjectId(campaign._id) };

router.post('/getContacts',(req,res) => {
     jwt.verify(req.token, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            res.send(false);
        }
        else{
            Contact.find({userId: ObjectId(decoded.data.id), confirmed: true})
            .populate('userId')
            .populate('contactId')
            .exec((err,contacts) => {
                if(err){
                    console.log(err);
                }
                else{
                   
                    var AllContacts = contacts.map((obj) =>{
                        if(obj.contactId){
                            return obj.contactId;
                        }
                    });
                    Contact.find({userId: ObjectId(decoded.data.id), confirmed: false})
                    .populate('userId')
                    .populate('contactId')
                    .exec((err,contacts) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            var OutComingRequests = contacts.map((obj) =>{
                                if(obj.contactId){
                                    return obj.contactId;
                                }
                            });
                               
                             Contact.find({contactId: ObjectId(decoded.data.id), confirmed: false})
                                .populate('userId')
                                .populate('contactId')
                                .exec((err,contacts) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        var IncomingRequests = contacts.map((obj) =>{
                                            if(obj.userId){
                                                return obj.userId;
                                            }
                                        });
                                           res.send(JSON.stringify({
                                                status: true,
                                                contacts: AllContacts,
                                                outcomingReq: OutComingRequests,
                                                incomingReq: IncomingRequests
                                            }));
                                    }
                                });
                        }
                    });
                }
            });
        }
     });
});

// Add request
router.post('/addRequest', (req,res) =>{
     jwt.verify(req.token, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            res.send(false);
        }
        else{
            Contact.findOne({contactId: ObjectId(decoded.data.id), userId: ObjectId(req.body.contact_id)}, (err,cont) => {
                if(err){
                    console.log(err);
                }
                else{
                    if(cont){
                        if(cont.confirmed){
                            res.send(JSON.stringify({
                                status: true,
                                msg: "This contact is already exists",
                            }));
                        }
                        else{
                            Contact.update({_id: ObjectId(cont._id)},{ confirmed: true}, (err)=>{
                                if(err){
                                   console.log(err);
                                }
                                else{
                                    newCon = new Contact({
                                        userId: new ObjectId(decoded.data.id),
                                        contactId: new ObjectId(req.body.contact_id),
                                        confirmed: true,
                                    });
                                    newCon.save((err, cont) =>{
                            if(err){
                               console.log(err);
                            }
                            else{
                                newNotif = new Notification({
                                    userId: ObjectId(req.body.contact_id),
                                    subject: "Your request was confirmed",
                                    text: decoded.data.nickName + " confirmed your request",
                                    read: false,
                                });
                                newNotif.save((err,not) =>{
                                    if(err){
                                      console.log(err);
                                    }
                                    else{
                                        Contact.populate(cont,{path: 'userId contactId'},(err,cont)=>{
                                            if(err){
                                              console.log(err);
                                            }
                                            else{
                                                if(cont){
                                                    if(users.users[req.body.contact_id])
                                                        users.users[req.body.contact_id].emit('add contact',{contact: cont.userId, notif: not});
                                                      res.send(JSON.stringify({
                                                      status: true,
                                                      msg: "You confirmed request from " + req.body.nickName,
                                                      contacts: cont.contactId,
                                                    }));
                                                }
                                            }
                                        });
                                      
                                    }
                                });
                            }
                        });
                                }
                            });
                        }
                    }
                    else{
                        newCont = new Contact({
                            userId: new ObjectId(decoded.data.id),
                            contactId: new ObjectId(req.body.contact_id),
                            confirmed: false,
                        });
                        newCont.save((err, cont) =>{
                            if(err){
                               console.log(err);
                            }
                            else{
                                if(cont){
                                    newNotif = new Notification({
                                        userId: ObjectId(req.body.contact_id),
                                        subject: "Incoming request",
                                        text: decoded.data.nickName + " want to add you to his contacts",
                                        read: false,
                                    });
                                    newNotif.save((err,not) =>{
                                    if(err){
                                       console.log(err);
                                    }
                                    else{
                                        Contact.populate(cont,{path: 'userId contactId'},(err,cont)=>{
                                            if(err){
                                              console.log(err);
                                            }
                                            else{
                                                if(cont){
                                                    if(users.users[req.body.contact_id])
                                                        users.users[req.body.contact_id].emit('incoming request',{contact: cont.userId, notif: not});
                                                    res.send(JSON.stringify({
                                                        status: true,
                                                        msg: "You request was sent",
                                                        outcoming: cont.contactId,
                                                    }));
                                                }
                                            }
                                        });  
                                    }
                                });
                                }
                            }
                        });
                    }
                }
            });
        }
     });
});

// Delete Contact 
// FBFriendModel.find({ id:333 }).remove().exec();
// Model.remove({ _id: req.body.id }, function(err) {;
router.delete('/deleteContact',(req,res) =>{
    jwt.verify(req.token, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            res.send(false);
        }
        else{
            Contact.remove({userId: ObjectId(decoded.data.id),contactId: ObjectId(req.body.id)}, (err) =>{
                if(err){
                    
                }
                else{
                   Contact.remove({userId: ObjectId(req.body.id),contactId: ObjectId(decoded.data.id)}, (err) =>{
                       if(err){

                       }
                       else{
                           if(users.users[req.body.id]){
                                users.users[req.body.id].emit('deleteContact',decoded.data.id);
                           }
                            res.send(JSON.stringify({
                                status: true,
                                id: req.body.id,
                            }));
                       }
                   });
                 
                }
            });
        }
    });
});

// Delete Notification
router.delete('/deleteNotification',(req,res) =>{
     jwt.verify(req.token, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            res.send(false);
        }
        else{
            Notification.remove({_id: ObjectId(req.body.id)}, (err) =>{
                if(!err){
                    res.send(JSON.stringify({
                        status: true,
                        id: req.body.id,
                    }));
                }
            });
        }
    });
});

// socket connections data
//var connections = 0;
//var users = {};

// socket authorization
io.use(function(socket, next) {
  var handshakeData = socket.request;
  var user = handshakeData._query.user;
  jwt.verify(user, cert, function(err, decoded) {
        if(!decoded || !decoded.data){
            
        }
        else{
            socket.username = decoded.data.nickName;
            socket.user_id = decoded.data.id;
            users.users[decoded.data.id] = socket;
            next();
        }
  });
});

io.sockets.on('connection',(socket) =>{
 
  users.connections++;
  console.log('Connected: %s sockets connected', users.connections);

  // Diconnect
  socket.on('disconnect',(data)=>{
    users.connections--;
    delete users.users[socket.user_id];
    console.log('Disconnected: %s sockets connected', users.connections);
  });

  socket.on('conversation:send', (data) =>{
      Conversation.findOne({_id: ObjectId(data.convId)},(err,conv) =>{
          if(err){
              console.log(err);
          }
          else{
              newMess = new Message({
                conv_id: ObjectId(data.convId),
                author: ObjectId(socket.user_id),
                date: new Date().getTime(),
                text: data.message,
                file: '',
                read: true,
              })
              newMess.save((err,mess) =>{
                  if(err){
                      console.log(err);
                  }
                  else{
                    for(let i = 0; i < conv.members.length; i++){
                        if(conv.members[i] in users.users){
                            if(conv.members[i] != socket.user_id){
                                newNotif = new Notification({
                                        userId: ObjectId(conv.members[i]),
                                        subject: "Incoming message",
                                        text: "Incoming message from "+socket.username,
                                        read: false,
                                    });
                                newNotif.save((err,notif) =>{
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        if(notif){
                                            Message.populate(mess,{path: "author"},(err,mess) =>{
                                                if(!err){
                                                    if(conv.members[i] in users.users){
                                                        users.users[conv.members[i]].emit('server:save message',{msg: mess, notif: notif});
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else{
                               Message.populate(mess,{path: "author"},(err,mess) =>{
                                                if(!err){
                                                     if(conv.members[i] in users.users){
                                                        users.users[conv.members[i]].emit('server:save message',{msg: mess, notif: ''});
                                                     }
                                                }
                                });
                            }
                        }
                    }
                  }
              });
            
          }
      });
  });
});

    return router
}
