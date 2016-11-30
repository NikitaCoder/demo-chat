import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from '../components/styles';
import io from 'socket.io-client';
import UserActions from '../api/actions/UserActions';


class SendMessageDialog extends React.Component {
    constructor(props){
        super(props);

        this.state = 
        {
            messageValue: '',
        }

        this.handleText = this.handleText.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);

    }
    componentDidMount(){
        
    }

    componentWillUnmount(){
       
    }

    handleText(e){
        this.setState({
            messageValue: e.target.value,
        });
    }

    handleSendMessage(){
        if(this.state.messageValue.trim())
            UserActions.sendMessage({ to: this.props.temporalUser.nickName, recipient_id: this.props.temporalUser.id, message: this.state.messageValue });
    }

    render(){
         const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onCloseHandler}
            />,
            <FlatButton
                label="Send"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSendMessage}
            />,
        ];
        return (
             <Dialog
                open={this.props.messageTogle}
                title="Send message"
                actions={actions}
                onRequestClose={this.props.onCloseHandler}
                >
                To: {this.props.temporalUser.nickName}
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
                </Dialog>
        )
    }
}

module.exports=SendMessageDialog;
