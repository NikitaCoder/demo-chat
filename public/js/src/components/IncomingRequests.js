import React from 'react';
import {List, ListItem} from 'material-ui/List';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import ContactActions from '../api/actions/ContactActions';

class IncomingRequests extends React.Component{
    constructor(props){
        super(props);

        this.state =
        {
            open: false,

        }

        this.handleDeleteTogle = this.handleDeleteTogle.bind(this);
        this.handlConfirmRequest = this.handlConfirmRequest.bind(this);
    }

    handleDeleteTogle(name, id){
        return function(e){
              this.setState({
            open: true,
            requestToCancel: {
                id: id,
                nickName: name, 
            },
        });
        }.bind(this);
    }

    handleDeleteCloseRequest(){
        this.setState({
            open: false,
        });
    }

    cancelRequest(){
        ContactActions.deleteContact(this.state.requestToCancel);
        this.handleDeleteCloseRequest();
    }

    handlConfirmRequest(user){
        return function(e){
            ContactActions.addContactRequest(user);
        }
    }

    render(){
        var incomingReq = this.props.incomingReq.map((obj) =>{
            return (
                 <ListItem
                    primaryText={obj.nickName}
                    key={obj._id}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                    <ListItem key={1} onTouchTap={this.handlConfirmRequest(obj)}  leftIcon={<DoneIcon />} >Confirm Request</ListItem>,
                    <ListItem key={3} onTouchTap={this.handleDeleteTogle(obj.nickName,obj._id)}  leftIcon={<DeleteIcon />} >Reject Request</ListItem>,
                  ]}
                    leftAvatar={<Avatar src={obj.avatar ? 'uploads/avatars/' + obj.avatar : "/logo/no-avatar.png"} />}
                >
                </ListItem >
            );
        });

        return(
            <div>
             <List >
                <Subheader>Incoming Requests</Subheader>
                {this.props.incomingReq.length ? incomingReq : "There are no incoming requests"}
             </List>
             <Dialog
                    open={this.state.open}
                    title="Cancel Request"
                    
                    onRequestClose={this.handleDeleteCloseRequest}
                    >
                     <RaisedButton
                        style={styles.button}
                        label="Yes"
                        primary={true}
                        onTouchTap={this.cancelRequest}
            />
                    <RaisedButton
                        label="No"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.handleDeleteCloseRequest}
                    />
                </Dialog>
                </div>
        )
    }
}

module.exports=IncomingRequests;