import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import Posts from '../components/Posts';
import PostForm from '../components/PostForm';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { lime800 } from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import UserStore from '../api/stores/UserStore';


class Conversation extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state=
        {
            convId: UserStore.getConversationId(),
            messages: UserStore.getMessages(),
            loggedIn: UserStore.isLoggedIn(),
            user: UserStore.getUser(),
        }
        this._onRegiser = this._onRegiser.bind(this);

    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
        document.title="Conversation";
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
    }

    _onRegiser(){
        this.setState({
            convId: UserStore.getConversationId(),
            messages: UserStore.getMessages(),
            loggedIn: UserStore.isLoggedIn(),
            user: UserStore.getUser(),
        });
    }

    render(){
        var postsData = this.state.messages.map((obj) =>{
            return (
                <Posts message={obj} key={obj._id} />
            );
        });
        return(
           <div style={styles.container}>
                <Header loggedIn={this.state.loggedIn} />
                <div style={styles.userData} >
                    {postsData}
                </div> 
                <div style={styles.userData}>
                    <PostForm user={this.state.user} convId={this.state.convId} />
                </div>        
                <Footer />
           </div>
        );

    }
}

module.exports=Conversation;