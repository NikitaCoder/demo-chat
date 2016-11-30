import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import LoginForm from '../components/LoginForm';
import LoginError from '../components/LoginError';
import FlatButton from 'material-ui/FlatButton';
import LoginActions from '../api/actions/LoginActions';
import UserStore from '../api/stores/UserStore';

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
            loginError: UserStore.getLoginError(),
            open: false,
            nick: '',
            password: '',
        }

        this.handleLoginData = this.handleLoginData.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestLogin = this.handleRequestLogin.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this._onRegiser = this._onRegiser.bind(this);
    }
    componentDidMount(){
        UserStore.addChangeListener(this._onRegiser);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onRegiser);
  }

    _onRegiser(){
         this.setState({
            loginError: UserStore.getLoginError()
         });
     }

     handleLoginData(e){
        this.setState({
        [e.target.name] : e.target.value,
        });
     }

    handleRequestClose() {
    this.setState({
      open: false,
    });
    }

    handleTouchTap() {
    this.setState({
      open: true,
    });
  }

    handleRequestLogin(){
        if(this.state.nick.trim() && this.state.password.trim()){
            LoginActions.login({
            email: this.state.nick,
            password: this.state.password,
            });
        }
    }


    render(){
        const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleRequestLogin}
      />,
    ];
        var login = "";
        if(this.state.loginError){
            login = <LoginError  
                      nick={this.state.nick} 
                      password={this.state.password} 
                      onLoginData={this.handleLoginData}  />;
        }
        else{
            login =  <LoginForm
                      nick={this.state.nick} 
                      password={this.state.password} 
                      onLoginData={this.handleLoginData} 
                    />;
        }
        return(
            <AppBar
                    style={style.appBar}
                    onLeftIconButtonTouchTap={this.props.onTap}
                > 
                    <Dialog
                    open={this.state.open}
                    title="Login"
                    actions={actions}
                    onRequestClose={this.handleRequestClose}
                >
                 {login}
                </Dialog>
                    <IconButton
                    onTouchTap={this.handleTouchTap}
                    iconStyle={{color: '#fff'}}
                    iconClassName="material-icons"
                    tooltip="Login"
                    
                    touch={true}
                    >
                    person
                    </IconButton>
                </AppBar>
        )
    }
}

module.exports=UserBar;