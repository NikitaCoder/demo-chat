const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const fs = require('fs');
const expressValidator = require('express-validator')
const api = require('./api')(io);
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');

const cert = fs.readFileSync('public.key').toString();

process.env.NODE_ENV = 'development';

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//bearer token
app.use(bearerToken());

// validator
app.use(expressValidator({
    customValidators: {
        minLength: function(val, len){
            return val.length >= len;
        },

    }
}));

//Set static path
app.use(express.static(__dirname + '/public'));

app.set('view engine','pug');

app.use('/api',api);

app.get('/',(req,res)=>{
    res.render('index');
});

app.all('*',(req,res)=>{
    res.send('<h2>404</h2><h3>Not Found</h3>');
})

server.listen(process.env.PORT || 3000, function(){
	console.log("Listening on 127.0.0.1, port " + (process.env.PORT || 3000));
});



