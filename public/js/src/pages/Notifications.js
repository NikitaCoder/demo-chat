import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import UserStore from '../api/stores/UserStore';
import UserActions from '../api/actions/UserActions';
import NotificationStore from '../api/stores/NotificationStore';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';

class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.state =
        {
            loggedIn: UserStore.isLoggedIn(),
            notifications: NotificationStore.getNotifications(),
        };

        this._onRegister = this._onRegister.bind(this);
        this._onGetNotification = this._onGetNotification.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegister);
        NotificationStore.addChangeListener(this._onGetNotification);
        document.title="Notifications";
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegister);
        NotificationStore.removeChangeListener(this._onGetNotification);
    }

    _onGetNotification(){
        this.setState({
            notifications: NotificationStore.getNotifications(),
        })
    }

    _onRegister(){
        this.setState({
            loggedIn: UserStore.isLoggedIn(),
            messageTogle: false,
        });
    }

    handleRead(obj){
        return function(e){
            if(!obj.read)
                UserActions.setReadStatus(obj._id);
        }
    }

    handleDelete(id){
        return function(e){
            UserActions.deleteNotification(id);
        }
    }

    render(){
        var notifs = this.state.notifications.map((obj) =>{
            return (
                <Card style={{margin: '10px'}} key={obj._id} onTouchTap={this.handleRead(obj)}>
                    <CardHeader
                        title={obj.subject} 
                        actAsExpander={true}
                        showExpandableButton={true} />
                    <CardText  expandable={true}>
                        {obj.text}
                    </CardText>
                    <CardActions>
                    <FlatButton onTouchTap={this.handleDelete(obj._id)}  primary={true} icon={<DeleteIcon />} label="Delete" />
                    </CardActions>
                </Card >
            )
        });
        return (
             <div >
                <Header loggedIn={this.state.loggedIn} />

                <div  style={{paddingTop: '180px', margin: '5px' }} >
                    {notifs}
                </div>
                <Footer />
             </div>
        );
    }
}

module.exports = Notifications;