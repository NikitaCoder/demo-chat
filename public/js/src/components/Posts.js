import React from 'react';
import styles from './styles';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';


class Posts extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div style={styles.postCont}>
                <Card>
                    <CardHeader
                    title={this.props.message.author.nickName}
                    subtitle={new Date(this.props.message.date).toString()}
                    avatar={this.props.message.author.avatar ? 'uploads/avatars/' + this.props.message.author.avatar : "logo/no-avatar.png"}
                    />
                    
                    <CardText>
                 {this.props.message.text}
                    </CardText>
                </Card>
            </div>
        );
    }
}

module.exports=Posts;