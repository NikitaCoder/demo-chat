import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserStore from '../api/stores/UserStore';
import RegisterActions from '../api/actions/RegisterActions';


class RegisterError extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     // errors: UserStore.getErrors(),
      firstName: UserStore.getFormData().firstName,
      lastName: UserStore.getFormData().lastName,
      nickName: UserStore.getFormData().nickName,
      email: UserStore.getFormData().email,
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

  componentWillMount(){
     
  }

  render(){
      var firstErr = "";
      var lastErr = "";
      var nickErr = "";
      var emailErr = "";
      var passErr = "";
      if( 'password' in this.props.errors){
          passErr = this.props.errors.password.msg;
      }
      if( 'firstName' in this.props.errors){
          firstErr = this.props.errors.firstName.msg;
      }
      if( 'lastName' in this.props.errors){
          lastErr = this.props.errors.lastName.msg;
      }
      if( 'email' in this.props.errors){
          emailErr = this.props.errors.email.msg;
      }
      if( 'nickName' in this.props.errors){
          nickErr = this.props.errors.nickName.msg;
      }
    return(
      <div>
        <TextField
          value={this.state.firstName}
          onChange={this.handleInput}
          errorText={firstErr}
          name="firstName"
          hintText="First Name"
          floatingLabelText="First Name"
        /><br />
        <TextField
          value={this.state.lastName}
          onChange={this.handleInput}
          errorText={lastErr}
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
        /><br />
        <TextField
          value={this.state.nickName}
          onChange={this.handleInput}
          errorText={nickErr}
          name="nickName"
          hintText="Nickname"
          floatingLabelText="Nickname"
        /><br />
        <TextField
          value={this.state.email}
          onChange={this.handleInput}
          errorText={emailErr}
          name="email"
          hintText="E-mail"
          floatingLabelText="E-mail"
        /><br />
        <br />
        <TextField
          value={this.state.password}
          onChange={this.handleInput}
          errorText={passErr}
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


module.exports=RegisterError;