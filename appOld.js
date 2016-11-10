require('babel-register')({
    presets: ["es2015", "react", "stage-0"]
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// React
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Main = require('./public/js/src/components/Main');
// React Router
const match = require('react-router').match;
const RouterContext = require('react-router').RouterContext;
const AppRouter = require('./public/js/src/components/MainRouter/router');
var createRoutes = require('react-router').createRoutes;
var routes = createRoutes(AppRouter());

// Mui Theme
const muiTheme = require('./public/js/src/components/muiTheme');

process.env.NODE_ENV = 'development';

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(__dirname + '/public'));

app.set('view engine','pug');

app.get('*',(req,res)=>{
  /*  match({routes, location: req.url}, (error, redirectLocation, renderProps) =>{
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {*/
           res.render('index',{title: 'Home Page'});
  /*      } else {
            res.status(404).send('Not found')
        }
    });*/
  /*  
    var reactContent = ReactDOMServer.renderToString(React.createElement(Main,{muiTheme: muiTheme}));
    res.sendFile(__dirname+'/views/index.html');*/
    //res.render('index',{title: 'Home Page', reactContent: reactContent}); 
});

app.listen(3000,()=>{
    console.log('Server running at port: 3000');
});