import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import styles from '../components/styles';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { green900, lime800 } from 'material-ui/styles/colors';
import UserActions from '../api/actions/UserActions';

class PostForm extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            messageValue: '',
        };

        this.handleText = this.handleText.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleText(e){
        this.setState({
            messageValue: e.target.value
        });
    }

    handleSend(e){
        if(this.state.messageValue.trim()){
             UserActions.send({ message: this.state.messageValue, convId: this.props.convId});
             this.setState({
                 messageValue: '',
             });
        }
    }

    render(){
        return(
            <div>
                <Card>
                    <CardHeader
                    title={this.props.user.nickName}
                    avatar={this.props.user.avatar ? 'uploads/avatars/' + this.props.user.avatar : "logo/no-avatar.png"}
                    />
                    <CardText>
                         <TextField
                            hintText="Input you message"
                            value={this.state.messageValue}
                            onChange={this.handleText}
                            multiLine={true}
                            underlineShow={false}
                            rows={5}
                            textareaStyle={{border: '1px solid #ccc', padding: '5px', borderRadius: '4px', background: '#fff' }}
                            fullWidth={true}
                            /><br />
                        <RaisedButton  label="Send" onClick={this.handleSend}  primary={true}/>
                        
                    </CardText>
                </Card>
            </div>
        );
    }
}

module.exports=PostForm;