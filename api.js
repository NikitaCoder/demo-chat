var express = require('express');
var router = express.Router();

router.post('/login', (req,res) =>{
    console.log(req.body);
});

router.post('/register', (req,res) => {
    console.log(req.body);
});

router.post('/geMessages',(req,res) =>{
    res.send(JSON.stringify(
[
    {
        user: 'Man',
        date: new Date().toString(),
        text: 'Hello George, how are you?',
        id: '1'
    },
    {
        user: 'George',
        date: new Date().toString(),
        text: 'I am fine, thank you. I have a <a href="#"> question </a> to you',
        id: '2'
    },
    {
        user: 'Man',
        date: new Date().toString(),
        text: 'I all attention',
        id: '3'
    }
]
    ));
});

module.exports=router;