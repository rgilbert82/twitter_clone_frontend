import React from 'react';
import { loginAPI } from '../../services/api/sessions';
import { Button, FormGroup, FormControl, Navbar } from 'react-bootstrap';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
     };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  submitForm() {
    const loginData = this.state;
    this.setState({ username: '', password: '' });

    return loginAPI(loginData)
      .then((data) => {
        this.props.appLogin(data.token);
      }).catch(() => {
        this.props.displayMessage('Incorrect username / password');
      });
  }

  render() {
    let component = (
      <Navbar.Form id="login_form" pullRight>
        <FormGroup>
          <FormControl id="username_field" type='text' onChange={this.updateUsername} value={this.state.username} placeholder='Username' />
        </FormGroup>
        <FormGroup>
          <FormControl id="password_field" type='password' onChange={this.updatePassword} value={this.state.password} placeholder='Password' />
        </FormGroup>
        <Button  onClick={this.submitForm} disabled={!this.state.username || !this.state.password } >Sign In</Button>
      </Navbar.Form>
    );

    return component;
  }
}
