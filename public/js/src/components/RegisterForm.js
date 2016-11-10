import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

const RegisterForm = () => (
    <div>
     <TextField
      hintText="Name"
      floatingLabelText="Name"
    /><br />
     <TextField
      hintText="Nick"
      floatingLabelText="Nick"
    /><br />
    <TextField
      hintText="E-mail"
      floatingLabelText="E-mail"
    /><br />
    <br />
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    /><br />
  </div>
);

export default RegisterForm;