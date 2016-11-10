import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyLogo from '../components/MyLogo';
import AppBar from 'material-ui/AppBar';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../components/styles';
import muiTheme from '../components/muiTheme';
import 'whatwg-fetch';
import Header from '../components/Header';
import Footer from '../components/Footer';


class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestLoginNick = this.handleRequestLoginNick.bind(this);
    this.handleRequestLoginPassword = this.handleRequestLoginPassword.bind(this);
    this.handleRequestLogin = this.handleRequestLogin.bind(this);

    this.state = {
      open: false,
      nick: '',
      password: '',

    };
  }
  componentDidMount(){
    document.title="Demo Chat";
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  handleRequestLogin(){
    console.log(this.state.nick);
    console.log(this.state.password);
  }

  handleRequestLoginNick(e){
    this.setState({
      nick: e.target.value,
    });
  }
  handleRequestLoginPassword(e){
   this.setState({
      password: e.target.value,
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

    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme ? this.props.muiTheme: muiTheme}>
        <div style={styles.container}>
        <Header />
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
                   <LoginForm
                      nick={this.state.nick} 
                      password={this.state.password} 
                      onLoginNick={this.handleRequestLoginNick} 
                      onLoginPassword={this.handleRequestLoginPassword} />
                </Dialog>
                <MyLogo  />
                <RaisedButton
                    style={styles.button}
                    label="Register"
                    secondary={true}
                    onTouchTap={this.handleTouchTap}
                />
                <strong style={styles.orcomp}> or </strong>
                <RaisedButton
                    style={styles.button}
                    label="Login"
                    secondary={true}
                    onTouchTap={this.handleTouchTap}
                />
                <div>
                <RaisedButton
                  style={styles.getStart}
                  label="Get Started"
                  secondary={true}
                  onTouchTap={this.handleTouchTap}
                />
                </div>
            </div>
            <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports=Main;