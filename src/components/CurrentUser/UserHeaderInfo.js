import React from 'react';
import { LogoutForm } from '../Sessions';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export default class UserHeaderInfo extends React.Component {
  render() {
    const userPath = `/users/${this.props.currentUser.slug}`;

    return (
      <div>
        <Nav pullLeft>
          <NavDropdown eventKey={1} title="Options" id="basic-nav-dropdown">
            <MenuItem><Link to={userPath}>My Profile</Link></MenuItem>
            <MenuItem><Link to='/account'>Edit Account</Link></MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight className="header_session_options">
          <LogoutForm appLogout={this.props.appLogout} />
        </Nav>
      </div>
    );
  }
}
