import React from 'react';
import { UserListItem } from '../Users';
import { getUserFollowersAPI } from '../../services/api/follows';

export default class UserFollowersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followers: [] };

    this.fetchFollowers = this.fetchFollowers.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.fetchFollowers();
    }
  }

  componendWillUnmount() {
    this._isMounted = false;
  }

  fetchFollowers() {
    return getUserFollowersAPI(this.props.user_id)
      .then((data) => {
        this.setState({ followers: data });
      }).catch(() => {
        this.props.displayMessage('There was an error loading the followers');
      });
  }

  render() {
    const followersList = this.state.followers.map((user) => {
      return (
        <li className="list_item" key={ user.id }>
          <UserListItem user={user} />
        </li>
      );
    });

    return (
      <div>
        <h2 className="sub_header">Followers</h2>
        <ul>
          {followersList}
        </ul>
      </div>
    );
  }
}
