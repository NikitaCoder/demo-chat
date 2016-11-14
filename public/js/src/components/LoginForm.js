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
      onChange={this.props.onLoginData}
      name="nick"
      hintText="E-mail"
      floatingLabelText="E-mail"
    /><br />
    <br />
    <TextField 
      onChange={this.props.onLoginData}
      value={this.props.password}
      name="password"
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    /><br />
  </div>
);
  }
} 

export default LoginForm;