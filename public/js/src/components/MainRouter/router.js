import React from 'react';
import { Router, browserHistory, hashHistory, Route} from 'react-router';
import Main from '../../pages/Main.js';
import Notifications from '../../pages/Notifications';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Register from '../../pages/Register.js';
import Skeleton from '../../pages/Skeleton.js';
import { IndexRoute } from 'react-router';
import GetStarted from '../../pages/GetStarted.js';
import UserPage from '../../pages/UserPage';
import Conversation from '../../pages/Conversation';
import ContactsList from '../../pages/ContactsList';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

function isAuth(nextState, replaceState) {
  if (sessionStorage.getItem('logged') != 'ok'){
       replaceState({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    })
  }
   
}


const AppRouter = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Skeleton}>
               <IndexRoute component={Main} />
                <Route path="/home" component={Main} />
                <Route path="/register" component={Register} />
                <Route path="/getstarted" component={GetStarted} />
                <Route path="/profile" component={UserPage} onEnter={isAuth} />
                <Route path="/contacts" component={ContactsList} onEnter={isAuth} />
                <Route path="/notifications" component={Notifications} onEnter={isAuth} />
                <Route path="/conversation/:name" component={Conversation}  onEnter={isAuth}  />  
            </Route>
        </Router>
    );
};

module.exports=AppRouter;