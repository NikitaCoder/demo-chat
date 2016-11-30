import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../components/styles';
import DeleteDialog from '../components/DeleteDialog';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {lime800, transparent} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import UserStore from '../api/stores/UserStore';
import ContactStore from '../api/stores/ContactStore';
import UserActions from '../api/actions/UserActions';
import ContactActions from '../api/actions/ContactActions'
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Tabs, Tab} from 'material-ui/Tabs';
import IncomingRequests from '../components/IncomingRequests';
import OutcomingRequests from '../components/OutcomingRequests';



class ContactList extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = 
        {
            status:  ContactActions.getContacts(),
            loggedIn: UserStore.isLoggedIn(),
            contacts: ContactStore.ContactsList(),
            incomingReq: ContactStore.getIncomingReq(),
            outcomingReq: ContactStore.getOutcomingReq(),
            deleteTogle: false,
            messageValue: '',
            userToDelete: {},
        }

        this._onRegister = this._onRegister.bind(this);
        this._onContactChange = this._onContactChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleDeleteTogle = this.handleDeleteTogle.bind(this);
        this.handleDeleteCloseRequest = this.handleDeleteCloseRequest.bind(this);
        this.handleOpenConversation = this.handleOpenConversation.bind(this);
    }

    handleRequestClose(){
        this.setState({
            messageTogle: false,
            messageValue: '',
        });
    }

    handleOpenConversation(name, id){
        return function(e){
            UserActions.openConversation({with: name, with_id: id})
        }
    }

    handleDeleteTogle(name,id){
        return function(e){
             this.setState({
            deleteTogle: true,
            userToDelete: {
                id: id,
                nickName: name, 
            },
        });
        }.bind(this);
    }
    handleDeleteCloseRequest(){
        this.setState({
            deleteTogle: false,
        });
    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegister);
        ContactStore.addChangeListener(this._onContactChange);
        document.title="Contacts";
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegister);
        ContactStore.removeChangeListener(this._onContactChange);
    }

    _onContactChange(){
        this.setState({
            contacts: ContactStore.ContactsList(),
            incomingReq: ContactStore.getIncomingReq(),
            outcomingReq: ContactStore.getOutcomingReq(),
            messageTogle: false,
        });
    }

    _onRegister(){
        this.setState({
            loggedIn: UserStore.isLoggedIn(),
            messageTogle: false,
        });
    }

    render(){
        var contacts = this.state.contacts.map((obj) =>{
            return (
                 <ListItem
                    primaryText={obj.nickName}
                    key={obj._id}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                    <ListItem key={2} onTouchTap={this.handleOpenConversation(obj.nickName,obj._id)}  leftIcon={<ChatIcon />} > Open Conversation</ListItem>,
                    <ListItem key={3} onTouchTap={this.handleDeleteTogle(obj.nickName,obj._id)}  leftIcon={<DeleteIcon />} > Delete Contact</ListItem>,
                  ]}
                    leftAvatar={<Avatar src={obj.avatar ? 'uploads/avatars/' + obj.avatar : "/logo/no-avatar.png"} />}
                >
                </ListItem >
            );
        });

        return (
                        <div style={styles.container}>
                            <Header loggedIn={this.state.loggedIn} />
                           
                             <Tabs  style={styles.tabs}>
                              <Tab label="Contacts">
                            <DeleteDialog deleteTogle={this.state.deleteTogle} userToDelete={this.state.userToDelete} onCloseHandler={this.handleDeleteCloseRequest}  />
                            <div  style={styles.contacts}>
                            <Card  >
                                <CardText  expandable={false}>
                                    <List >
                                       {contacts}
                                    </List>
                                    <Divider inset={true} />
                                </CardText>
                            </Card>
                            </div>
                            </Tab>
                            <Tab label="Requests" icon={<div>{(this.state.outcomingReq.length + this.state.incomingReq.length) ? (this.state.outcomingReq.length + this.state.incomingReq.length) : "" }</div>}>
                                <div  style={styles.contacts}>
                                    <Card  >
                                    <CardText  expandable={false}>
                                       <IncomingRequests incomingReq={this.state.incomingReq}  />
                                       <OutcomingRequests outcoming={this.state.outcomingReq} />
                                    </CardText>
                                    </Card>
                                </div>
                            </Tab>
                            </Tabs>
                            <Footer />
                        </div>
        );
    }
}

module.exports=ContactList;