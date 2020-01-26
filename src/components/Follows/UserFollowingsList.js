import React from 'react';
import { UserListItem } from '../Users';
import { getUserFollowingsAPI } from '../../services/api/follows';
import { deleteFollowAPI } from '../../services/api/follows';

export default class UserFollowingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followings: [] };

    this.fetchFollowings = this.fetchFollowings.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchFollowings();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchFollowings() {
    return getUserFollowingsAPI(this.props.user_id)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ followings: data });
        }
      }).catch(() => {
        if (this._isMounted) {
          this.props.displayMessage('There was an error loading the followings');
        }
      });
  }

  unfollowUser(userID) {
    return deleteFollowAPI(userID)
      .then(() => {
        if (this._isMounted) {
          this.setState({ followings: this.state.followings.filter((fol) => { return fol.id !== userID }) });
          this.props.deleteFollowFromList();
        }
      }).catch(() => {
        if (this._isMounted) {
          this.props.displayMessage('There was an error unfollowing the user');
        }
      });
  }

  render() {
    const followingsList = this.state.followings.map((user) => {
      return (
        <li className="list_item" key={ user.id }>
          <UserListItem user={user} isCurrentUserPage={this.props.isCurrentUserPage} unfollowUser={this.unfollowUser} />
        </li>
      );
    });

    return (
      <div>
        <h2 className="sub_header">Following</h2>
        <ul>
          {followingsList}
        </ul>
      </div>
    );
  }
}
