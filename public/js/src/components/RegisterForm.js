import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import AppDispatcher from '../api/AppDispatcher';
//import UserStore from '../api/UserStore';
import RegisterActions from '../api/RegisterActions';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';


class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nickName: '',
      email: '',
      password: '',
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleRegister(){
    RegisterActions.register(this.state);
  }

  handleInput(e){
    //console.log(e.target.name);
    name = e.target.name
   this.setState({
      [e.target.name] : e.target.value 
    });
  }

  render(){
    return(
      <div>
       <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
      > 
        <FormsyText
          value={this.state.firstName}
          onChange={this.handleInput}
          validations="isWords"
          validationError="Only letters"
          name="firstName"
          hintText="First Name"
          floatingLabelText="First Name"
        /><br />
        <FormsyText
          value={this.state.lastName}
          onChange={this.handleInput}
          validations="isWords"
          validationError="Only letters"
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
        /><br />
        <FormsyText
          value={this.state.nickName}
          onChange={this.handleInput}
          validations="isAlphanumeric"
          validationError="Only letters and numeric"
          name="nickName"
          hintText="Nickname"
          floatingLabelText="Nickname"
        /><br />
        <FormsyText
          value={this.state.email}
          onChange={this.handleInput}
          validations="isEmail"
          validationError="E-mail is not valid"
          name="email"
          hintText="E-mail"
          floatingLabelText="E-mail"
        /><br />
        <br />
        <FormsyText
          value={this.state.password}
          onChange={this.handleInput}
          validations="minLength:8"
          validationError="Minimum 8 symbols"
          name="password"
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
        /><br />
        <br />
        <RaisedButton label="Register" primary={true} onClick={this.handleRegister} />
      </Formsy.Form>
    </div>
    );
  }
}


module.exports=RegisterForm;