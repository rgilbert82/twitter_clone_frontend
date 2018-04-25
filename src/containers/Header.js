import React from 'react';
import { UserHeaderInfo } from '../components/CurrentUser';
import { LoginForm } from '../components/Sessions';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    let session;

    if (this.props.loggedIn) {
      session = (
        <div>
          <UserHeaderInfo currentUser={this.props.currentUser} appLogout={this.props.appLogout} displayMessage={this.props.displayMessage} />
        </div>
      );
    } else {
      session = (
        <div>
          <Nav pullLeft>
            <NavDropdown eventKey={1} title="Options" id="basic-nav-dropdown">
              <MenuItem><Link to='/register'>Sign up for an account</Link></MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight className="header_session_options">
            <LoginForm appLogin={this.props.appLogin} displayMessage={this.props.displayMessage} />
          </Nav>
        </div>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><Link to="/">Tweeter!</Link></Navbar.Brand>
        </Navbar.Header>
        { session }
      </Navbar>
    );
  }
}
