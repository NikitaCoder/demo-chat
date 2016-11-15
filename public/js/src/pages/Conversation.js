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

var AllMessages = [];

class Conversation extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state=
        {
            messages: AllMessages,
        }
        this.handleSendClick = this.handleSendClick.bind(this);

    }
    componentWillMount(){
         fetch('/api/geMessages', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(function(res){
            return res.json();
        }).then(function(json){
            console.log(json);
           AllMessages = json;
           this.setState({
               messages: AllMessages
           })
            return json;
        }.bind(this)).catch(function(err){
            return err;
        });
        
    }

     componentDidMount(){
        document.title="Conversation";
    }

    handleSendClick(data){
        AllMessages.push({user: 'Sam Williams', date: 'today', text: data, id: (AllMessages.length+1)});
        this.setState({
            messages: AllMessages,
        });
    }

    render(){
        console.log(this.state.messages);
        var postsData = this.state.messages.map((obj) =>{
            return (
                <Posts message={obj} key={obj.id} />
            );
        });

        return(
           <div style={styles.container}>
                <Header />
                <div style={styles.userData} >
                    {postsData}
                </div> 
                <div style={styles.userData}>
                    <PostForm onSend={this.handleSendClick} />
                </div>        
                <Footer />
           </div>
        );

    }
}

module.exports=Conversation;