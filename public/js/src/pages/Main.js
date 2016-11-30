import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyLogo from '../components/MyLogo';
import LoginForm from '../components/LoginForm';
import LoginError from '../components/LoginError';
import styles from '../components/styles';
import 'whatwg-fetch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginActions from '../api/actions/LoginActions';
import UserStore from '../api/stores/UserStore';


class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleLoginData = this.handleLoginData.bind(this);
    this.handleRequestLogin = this.handleRequestLogin.bind(this);
    this._onRegiser = this._onRegiser.bind(this);

    this.state = {
      loggedIn: UserStore.isLoggedIn(),
      loginError: UserStore.getLoginError(),
      open: false,
      nick: '',
      password: '',

    };
  }
  componentDidMount(){
    UserStore.addChangeListener(this._onRegiser);
    document.title="Demo Chat";
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this._onRegiser);
  }

  _onRegiser(){
    this.setState({
      loggedIn: UserStore.isLoggedIn(),
      loginError: UserStore.getLoginError()
    });
  }


  handleRequestClose() {
    this.setState({
      open: false,
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

  handleLoginData(e){
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
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
                  onLoginData={this.handleLoginData} 
                       />;
        }
        else{
            login =  <LoginForm
                      nick={this.state.nick} 
                      password={this.state.password} 
                      onLoginData={this.handleLoginData} 
                    />;
        }

    return (
     
        <div style={styles.container}>
        <Header loggedIn={this.state.loggedIn} />
          <div style={styles.intro} >
            <span className="introText">Demo Chat application provides a convenient and fast way  of communicating  in real time</span>
          </div>
            <div style={styles.content}>
                <Dialog
                    open={this.state.open}
                    title="Login"
                    actions={actions}
                    onRequestClose={this.handleRequestClose}
                >
                  {login}
                </Dialog>
                <MyLogo  />
                <RaisedButton
                    style={styles.button}
                    label="Register"
                    primary={true}
                    href="#/register"
                />
                <strong style={styles.orcomp}> or </strong>
                <RaisedButton
                    style={styles.button}
                    label="Login"
                    primary={true}
                    onTouchTap={this.handleTouchTap}
                />
                <div>
                <RaisedButton
                  style={styles.getStart}
                  label="Get Started"
                  primary={true}
                  href="#/getstarted"
                />
                </div>
            </div>
            <Footer />
        </div>
   
    );
  }
}

module.exports=Main;
