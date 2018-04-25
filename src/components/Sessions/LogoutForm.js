import React from 'react';
import { logoutAPI } from '../../services/api/sessions';
import { Navbar, Button } from 'react-bootstrap';

export default class LogoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    return logoutAPI()
      .then(() => {
        this.props.appLogout();
      }).catch(() => {
        this.props.appLogout();
      });
  }

  render() {
    return (
      <Navbar.Form id="logout_form">
        <Button id="submit_logout_form" onClick={this.logout}>Logout</Button>
      </Navbar.Form>
    );
  }
}
