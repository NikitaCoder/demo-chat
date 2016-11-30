import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import UserActions from '../api/actions/UserActions';
import ContactActions from '../api/actions/ContactActions';
import UserStore from '../api/stores/UserStore';
import ContactStore from '../api/stores/ContactStore';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import Snackbar from 'material-ui/Snackbar';
import Bell from './Bell';


var style = {
    appBar:{
        position: 'fixed',
    }
};

class UserBar extends React.Component{
    constructor(props){
        super(props);

        this.state = 
        {
            dataSource: UserStore.getSearchList(),
            requestTogle: false,
            user: {},
            requestInfo: {},
        }

        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleAddContact = this.handleAddContact.bind(this);
        this._onRegister = this._onRegister.bind(this);
        this._onRequest = this._onRequest.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.handleSendRequest = this.handleSendRequest.bind(this);
    }

    componentDidMount(){
        UserStore.addChangeListener(this._onRegister);
        ContactStore.addChangeListener(this._onRequest);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegister);
        ContactStore.removeChangeListener(this._onRequest);
    }

    closeHandler(){
        this.setState({
            requestTogle: false,
        });
    }

    _onRegister(){
        this.setState({
             dataSource: UserStore.getSearchList(),
            // requestInfo: UserStore.getRequestInfo(),
        });
    }

    _onRequest(){
        this.setState({
            requestInfo: ContactStore.getRequestInfo(),
        })
    }

    handleFilter(searchText, key){
        return searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }

    handleAddContact(user){
        return function(e){
                this.setState({
                    requestTogle: true,
                    user: user,
                });
        }.bind(this);
    }

    handleSendRequest(){
        if(this.state.user){
             ContactActions.addContactRequest(this.state.user);
             this.setState({
                 requestTogle: false,
             });
        }
    }

     handleUpdateInput(value) {
         if(value.length > 3){
             UserActions.searchContacts(value);
        }
     }


    render(){
        var buff = [];
          for( let i = 0; i < this.state.dataSource.length; i++){
                    buff.push({text: this.state.dataSource[i].nickName, value: (<MenuItem  onTouchTap={this.handleAddContact(this.state.dataSource[i])} leftIcon={ <Avatar src={this.state.dataSource[i].avatar ? 'uploads/avatars/' + this.state.dataSource[i].avatar : "/logo/no-avatar.png"} size={80} />}  rightIcon={<PersonAdd />} ><div id={this.state.dataSource[i]._id}> {this.state.dataSource[i].nickName} </div></MenuItem>)});
                }
        return(
            <AppBar
                    style={style.appBar}
                    onLeftIconButtonTouchTap={this.props.onTap}
                >
                 <Dialog
                    open={this.state.requestTogle}
                    title={"Send request to" + this.state.user.nickName}
                    onRequestClose={this.closeHandler}
                    >
                     <RaisedButton
                        style={styles.button}
                        label="Send"
                        primary={true}
                        onTouchTap={this.handleSendRequest}
                    />
                    <RaisedButton
                        label="Cancel"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.closeHandler}
                    />
                </Dialog>
                
                {this.state.requestInfo.snackbar ? 
                  <Snackbar
                    open={this.state.requestInfo.snackbar}
                    message={this.state.requestInfo.msg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                /> : "" }

                <AutoComplete
                hintText="Search..."
                dataSource={buff}
                filter={this.handleFilter}
                onUpdateInput={this.handleUpdateInput}
                underlineShow={false}
                style={{background: '#fff',padding: '5px', top: 20,right: 12, borderRadius: '2px', height: '30px'}}
                 />
                 <Bell />
                </AppBar>
        )
    }
}

module.exports=UserBar;