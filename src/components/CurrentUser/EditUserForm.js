import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.currentUser.name || '',
      newUsername: this.props.currentUser.username || '',
      newPassword: ''
    }

    this.isValidForm = this.isValidForm.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateName(e) {
    this.setState({ newName: e.target.value });
  }

  updateUsername(e) {
    this.setState({ newUsername: e.target.value });
  }

  updatePassword(e) {
    this.setState({ newPassword: e.target.value });
  }

  isValidPassword() {
    return this.state.newPassword.length === 0 || this.state.newPassword.length >= 8;
  }

  isValidForm() {
    return this.state.newName.length >= 3 && this.state.newUsername.length >= 3 && this.isValidPassword();
  }

  submitForm() {
    let userData = {
      id: this.props.currentUser.id,
      name: this.state.newName,
      username: this.state.newUsername,
    }

    if (this.state.newPassword.length > 0) {
      userData.password = this.state.newPassword;
    }

    this.props.editUser(userData);
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel htmlFor="userNameForm">Name</ControlLabel>
          <FormControl id="userNameForm" type="text" defaultValue={this.props.currentUser.name} onChange={this.updateName} />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="userUsernameForm">Username</ControlLabel>
          <FormControl id="userUsernameForm" type="text" defaultValue={this.props.currentUser.username} onChange={this.updateUsername} />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="userPasswordForm">New Password</ControlLabel>
          <FormControl id="userPasswordForm" type="password" onChange={this.updatePassword} />
        </FormGroup>
        <div id="edit_form_buttons">
          <Button id="submit_form" disabled={!this.isValidForm()} onClick={this.submitForm}>Update Account</Button>
          <Button onClick={this.props.destroyAccount}>Delete Account</Button>
        </div>
      </div>
    );
  }
}
