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
                    title="Sam Jones"
                    avatar="logo/logo.png"
                    />
                    
                    <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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