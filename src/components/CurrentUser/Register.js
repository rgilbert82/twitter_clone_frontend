import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: ''
    }

    this.updateName = this.updateName.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  isValidForm() {
    return this.state.name.length >= 3 && this.state.username.length >= 3 && this.state.password.length >= 8;
  }

  createNewUser() {
    this.props.createUser(this.state);
  }

  render() {
    if (this.props.loggedIn) {
      return (<Redirect to='/' />);
    } else {
      return (
        <div className="page_form" id="register_form">
          <h1>Register</h1>
          <div>
            <FormGroup>
              <ControlLabel htmlFor="userNameForm">Name</ControlLabel>
              <FormControl id="userNameForm" type="text" value={this.state.name} onChange={this.updateName} />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="userUsernameForm">Username</ControlLabel>
              <FormControl id="userUsernameForm" type="text" value={this.state.username} onChange={this.updateUsername} />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="userPasswordForm">Password</ControlLabel>
              <FormControl id="userPasswordForm" type="password" value={this.state.password} onChange={this.updatePassword} />
            </FormGroup>
            <Button id="submit_form" disabled={!this.isValidForm()} onClick={this.createNewUser}>Sign Up</Button>
          </div>
        </div>
      );
    }
  }
}
