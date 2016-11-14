import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import AppDispatcher from '../api/AppDispatcher';
import RegisterStore from '../api/RegisterStore';
import RegisterActions from '../api/RegisterActions';


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
        <TextField
          value={this.state.firstName}
          onChange={this.handleInput}
          name="firstName"
          hintText="First Name"
          floatingLabelText="First Name"
        /><br />
        <TextField
          value={this.state.lastName}
          onChange={this.handleInput}
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
        /><br />
        <TextField
          value={this.state.nickName}
          onChange={this.handleInput}
          name="nickName"
          hintText="Nickname"
          floatingLabelText="Nickname"
        /><br />
        <TextField
          value={this.state.email}
          onChange={this.handleInput}
          name="email"
          hintText="E-mail"
          floatingLabelText="E-mail"
        /><br />
        <br />
        <TextField
          value={this.state.password}
          onChange={this.handleInput}
          name="password"
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
        /><br />
        <br />
        <RaisedButton label="Register" primary={true} onClick={this.handleRegister} />
    </div>
    );
  }
}


module.exports=RegisterForm;