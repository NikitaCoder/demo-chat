import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import '../../css/main.css';
import AppRouter from './components/MainRouter/router.js';
import UserApi from './api/utils/UserApi';

UserApi.checkUser();


/*
Register, create your room, and talk
)*/


ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
);