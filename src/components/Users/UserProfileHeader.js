import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class UserProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false
    };

    this.createFollow = this.createFollow.bind(this);
    this.deleteFollow = this.deleteFollow.bind(this);
  }

  createFollow() {
    this.props.createFollow(this.props.user.id);
  }

  deleteFollow() {
    this.props.deleteFollow(this.props.user.id);
  }

  render() {
    const tweetPath = `/users/${this.props.user.slug}/`;
    const followingPath = `/users/${this.props.user.slug}/following`;
    const followersPath = `/users/${this.props.user.slug}/followers`;
    let followButton;

    if (!!this.props.isCurrentUserPage && !this.props.isCurrentUserPage()) {
      if (this.props.loggedIn && this.props.isFollowing) {
        followButton = <Button onClick={this.deleteFollow}>Unfollow</Button>;
      } else if (this.props.loggedIn) {
        followButton = <Button onClick={this.createFollow}>Follow</Button>;
      }
    }

    return (
      <div>
        <h1 className="section_header">{this.props.user.name}<span>@{this.props.user.username}</span></h1>
        <div>
          <div className="user_stats user_profile_info">
            <dl>
              <dt><Link to={tweetPath}>Tweets</Link></dt>
              <dd>{this.props.user.all_tweet_count}</dd>
            </dl>
            <dl>
              <dt><Link to={followingPath}>Following</Link></dt>
              <dd>{this.props.user.following}</dd>
            </dl>
            <dl>
              <dt><Link to={followersPath}>Followers</Link></dt>
              <dd>{this.props.user.followers}</dd>
            </dl>
          </div>
          <div className="follow_button">
            {followButton}
          </div>
        </div>
      </div>
    );
  }
}
