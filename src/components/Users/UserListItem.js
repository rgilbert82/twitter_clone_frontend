import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class UserListItem extends React.Component {
  constructor(props) {
    super(props);
    this.unfollow = this.unfollow.bind(this);
  }

  unfollow() {
    if (!!this.props.unfollowUser) {
      this.props.unfollowUser(this.props.user.id);
    }
  }

  render() {
    const path = '/users/' + this.props.user.slug;
    let follows;
    let unfollow;

    if (!!this.props.user.followers) {
      follows = (
        <div className="user_list_item_follows">
          <dl>
            <dt>Followers:</dt>
            <dd>{this.props.user.followers}</dd>
          </dl>
          <dl>
            <dt>Following:</dt>
            <dd>{this.props.user.following}</dd>
          </dl>
        </div>
      );
    }

    if (!!this.props.isCurrentUserPage && !!this.props.isCurrentUserPage()) {
      unfollow = (<Button className="right_float_button" onClick={this.unfollow}>Unfollow</Button>);
    }

    return (
      <div className="user_list_item">
        <div className="user_list_item_header">
          <h3><Link to={path}>{this.props.user.name}</Link></h3>
          <aside>@<Link to={path}>{this.props.user.username}</Link></aside>
        </div>
        {follows}
        {unfollow}
      </div>
    );
  }
}
