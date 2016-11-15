import React from 'react';
import styles from './styles';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';


class Posts extends React.Component{
    constructor(props){
        super(props);

    }

    cleanHtml(){
        return { __html: this.props.message.text}
    }

    render(){
        return(
            <div style={styles.postCont}>
                <Card>
                    <CardHeader
                    title={this.props.message.user}
                    subtitle={this.props.message.data}
                    avatar="logo/logo.png"
                    />
                    
                    <CardText>
                 {this.props.message.text}
                    </CardText>
                    <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

module.exports=Posts;