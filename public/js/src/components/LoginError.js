import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import styles from '../components/styles';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    
  }

  render() {
    return (
    <div>
     <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
      > 
    <FormsyText 
      value={this.props.nick}
      onChange={this.props.onLoginData}
      name="nick"
      hintText="E-mail"
      floatingLabelText="E-mail"
      validations="isEmail"
      validationError="E-mail is not valid"
    /><br />
    <br />
    <FormsyText 
      onChange={this.props.onLoginData}
      value={this.props.password}
      name="password"
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      
    /><br />
    </ Formsy.Form>
    <br />
    <h3 style={styles.error}>Invalid email or password</h3>

  </div>
);
  }
} 

export default LoginForm;