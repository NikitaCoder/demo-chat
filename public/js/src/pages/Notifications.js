import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import UserStore from '../api/stores/UserStore';

class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.state =
        {
            loggedIn: UserStore.isLoggedIn(),
        };

    }

    render(){
        return (
             <div style={styles.container}>
                <Header loggedIn={this.state.loggedIn} />
                <br />
                <br />
                <br />
                <br />
                <Card >
                    <CardHeader
                        title="Subject" 
                        actAsExpander={true}
                        showExpandableButton={true} />
                    <CardText  expandable={true}>
                        This is the place where text will render
                    </CardText>
                </Card >
                <Footer />
             </div>
        );
    }
}

module.exports = Notifications;