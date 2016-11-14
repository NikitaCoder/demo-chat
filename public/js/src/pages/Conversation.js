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


class Conversation extends React.Component{
    constructor(props, context){
        super(props, context);

    }
     componentDidMount(){
        document.title="Conversation";
    }

    render(){
        return(
           <div style={styles.container}>
                <Header />
                <div style={styles.userData} >
                    <Posts />
                    <Posts />
                    <Posts />
                </div> 
                <div style={styles.userData}>
                    <PostForm />
                </div>        
                <Footer />
           </div>
        );

    }
}

module.exports=Conversation;