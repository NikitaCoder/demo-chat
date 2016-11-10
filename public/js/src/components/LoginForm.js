import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    
  }

  render() {
    return (
    <div>
    <TextField 
      value={this.props.nick}
      onChange={this.props.onLoginNick}
      hintText="Nick or E-mail"
      floatingLabelText="Nick or E-mail"
    /><br />
    <br />
    <TextField 
      onChange={this.props.onLoginPassword}
      value={this.props.password}
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    /><br />
  </div>
);
  }
} 

export default LoginForm;