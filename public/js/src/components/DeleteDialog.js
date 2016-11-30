import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import ContactActions from '../api/actions/ContactActions';


class DeleteDialog extends React.Component{
    constructor(props){
        super(props);

        this.deleteContact = this.deleteContact.bind(this);

    }

    deleteContact(){
        ContactActions.deleteContact(this.props.userToDelete);
        this.props.onCloseHandler();
    }

    render(){
        return (
               <Dialog
                    open={this.props.deleteTogle}
                    title="Delete Contact?"
                    
                    onRequestClose={this.props.onCloseHandler}
                    >
                   <h3> {this.props.userToDelete.nickName} </h3> <br />
                     <RaisedButton
                        style={styles.button}
                        label="Delete"
                        primary={true}
                        onTouchTap={this.deleteContact}
            />
                    <RaisedButton
                        label="Cancel"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.props.onCloseHandler}
                    />
                </Dialog>
        );
     
    }
}

module.exports=DeleteDialog;