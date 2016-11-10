import React from 'react';
import { Router, browserHistory, Route} from 'react-router';
import Main from '../../pages/Main.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();


const AppRouter = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <Route path="/home" component={Main} />
            </Route>
        </Router>
    );
};

module.exports=AppRouter;