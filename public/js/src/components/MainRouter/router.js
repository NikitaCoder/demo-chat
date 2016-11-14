import React from 'react';
import { Router, browserHistory, Route} from 'react-router';
import Main from '../../pages/Main.js';
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


const AppRouter = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Skeleton}>
               <IndexRoute component={Main} />
                <Route path="home" component={Main} />
                <Route path="register" component={Register} />
                <Route path="getstarted" component={GetStarted} />
                <Route path="profile" component={UserPage} />
                <Route path="contacts" component={ContactsList} />
                <Route path="conversation" component={Conversation} />
            </Route>
        </Router>
    );
};

module.exports=AppRouter;