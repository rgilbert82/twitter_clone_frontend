import React from 'react';
import { Redirect } from 'react-router-dom';
import { EditUserForm } from '.';
import { PageLoading } from '../Misc';

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.destroyAccount = this.destroyAccount.bind(this);
  }

  destroyAccount() {
    if (window.confirm("Are you sure?")) {
      this.props.deleteAccount(this.props.currentUser.id);
    }
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="page_form" id="edit_user_form">
          <h1>{this.props.currentUser.name}'s Account</h1>
          <div className="user_stats user_form_stats user_profile_info">
            <dl>
              <dt>Following</dt>
              <dd>{this.props.currentUser.following}</dd>
            </dl>
            <dl>
              <dt>Followers</dt>
              <dd>{this.props.currentUser.followers}</dd>
            </dl>
          </div>
          <EditUserForm destroyAccount={this.destroyAccount} currentUser={this.props.currentUser} editUser={this.props.editUser} displayMessage={this.props.displayMessage} />
        </div>
      );
    } else if (this.props.loggedIn === undefined){
      return ( <PageLoading />);
    } else {
      return (<Redirect to='/' />);
    }
  }
}
