/*require('babel-register')({
    presets: ["es2015", "react", "stage-0"]
});*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');

process.env.NODE_ENV = 'development';

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(__dirname + '/public'));

app.set('view engine','pug');

app.use('/api',api);

app.get('/', function (req, res) {
    res.status('200').send('Service is up');
});

app.get('*',(req,res)=>{
    res.render('index');
});

app.listen(3000,()=>{
    console.log('Server running at port: 3000');
});