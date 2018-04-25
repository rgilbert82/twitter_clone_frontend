import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserProfileHeader } from '.';
import { UserTweetsList, TweetModal } from '../Tweets';
import { UserFollowersList, UserFollowingsList } from '../Follows';
import { PageLoading } from '../Misc';
import { getUserAPI } from '../../services/api/users';
import { getFollowAPI, createFollowAPI, deleteFollowAPI } from '../../services/api/follows';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userLoaded: false,
      isFollowing: false
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchFollow = this.fetchFollow.bind(this);
    this.createFollow = this.createFollow.bind(this);
    this.deleteFollow = this.deleteFollow.bind(this);
    this.lowerTweetCount = this.lowerTweetCount.bind(this);
    this.raiseTweetCount = this.raiseTweetCount.bind(this);
    this.deleteFollowFromList = this.deleteFollowFromList.bind(this);
    this.isCurrentUserPage = this.isCurrentUserPage.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.setState({ user: {}, userLoaded: false }, () => {
        this.fetchUser();
      });
    }

    if (this.props.currentUserChange !== prevProps.currentUserChange && this.isCurrentUserPage()) {
      this.setState({ user: {}, userLoaded: false }, () => {
        this.fetchUser();
      });
    }
  }

  isCurrentUserPage() {
    return !!this.props.loggedIn && this.props.currentUser.id === this.state.user.id;
  }

  fetchUser() {
    return getUserAPI(this.props.match.params.slug)
      .then((data) => {
        data.all_tweet_count = Number(data.tweet_count) + Number(data.retweet_count);
        this.setState({ user: data, userLoaded: true });
        if (this.props.loggedIn) {
          this.fetchFollow(data.id);
        }
      }).catch(() => {
        this.props.displayMessage('Oops! Something went wrong loading this page!');
      });
  }

  lowerTweetCount() {
    let updatedUser = this.state.user;

    if (this.isCurrentUserPage() && updatedUser.all_tweet_count) {
      updatedUser.all_tweet_count -= 1;
    }

    this.setState({ user: updatedUser });
    this.props.lowerSidebarTweetCount();
  }

  raiseTweetCount() {
    let updatedUser = this.state.user;

    if (this.isCurrentUserPage() && updatedUser.all_tweet_count) {
      updatedUser.all_tweet_count += 1;
    }

    this.setState({ user: updatedUser });
    this.props.raiseSidebarTweetCount();
  }

  fetchFollow(userID) {
    return getFollowAPI(userID)
      .then((data) => {
        if (data.length > 0) {
          this.setState({ isFollowing: true });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  createFollow(userID) {
    return createFollowAPI(userID)
      .then((data) => {
        let updatedUser = this.state.user;
        if (updatedUser.followers) {
          updatedUser.followers = Number(updatedUser.followers) + 1;
        } else {
          updatedUser.followers = 1;
        }

        this.setState({ isFollowing: true, user: updatedUser });
        this.props.raiseSidebarFollowingCount();
      }).catch(() => {
        this.props.displayMessage('Oops! Something went wrong!');
      });
  }

  deleteFollow(userID) {
    return deleteFollowAPI(userID)
      .then((data) => {
        let updatedUser = this.state.user;
        if (updatedUser.followers) {
          updatedUser.followers = Number(updatedUser.followers) - 1;
        }

        this.setState({ isFollowing: false, user: updatedUser });
        this.props.lowerSidebarFollowingCount();
      }).catch(() => {
        this.props.displayMessage('Oops! Something went wrong!');
      });
  }

  deleteFollowFromList() {
    let updatedUser = this.state.user;

    this.props.lowerSidebarFollowingCount();
    if (this.isCurrentUserPage() && updatedUser.following) {
      updatedUser.following = Number(updatedUser.following) - 1;
      this.setState({ user: updatedUser });
    }
  }

  render() {
    const sameUser = (this.state.user.slug === this.props.match.params.slug);
    let userContent;

    if (this._isMounted && this.state.userLoaded && sameUser) {
      userContent = (
        <Switch>
          <Route exact path='/users/:slug' render={(props) => <UserTweetsList {...props} user_id={this.state.user.id} loggedIn={this.props.loggedIn} isCurrentUserPage={this.isCurrentUserPage} displayMessage={this.props.displayMessage} navigateToSearch={this.props.navigateToSearch} lowerTweetCount={this.lowerTweetCount} raiseTweetCount={this.raiseTweetCount} raiseSidebarTweetCount={this.props.raiseSidebarTweetCount} />} />
          <Route exact path='/users/:slug/followers' render={() => <UserFollowersList user_id={this.state.user.id} loggedIn={this.props.loggedIn} displayMessage={this.props.displayMessage} />} />
          <Route exact path='/users/:slug/following' render={() => <UserFollowingsList user_id={this.state.user.id} loggedIn={this.props.loggedIn} isCurrentUserPage={this.isCurrentUserPage} displayMessage={this.props.displayMessage} deleteFollowFromList={this.deleteFollowFromList} />} />
          <Route exact path='/users/:slug/:tweet_slug' render={(props) => <TweetModal {...props} loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} displayMessage={this.props.displayMessage} navigateToSearch={this.props.navigateToSearch} raiseSidebarTweetCount={this.props.raiseSidebarTweetCount} isCurrentUserPage={this.isCurrentUserPage} />} />
        </Switch>
      );
    } else {
      userContent = <PageLoading />;
    }

    return (
      <div>
        <UserProfileHeader user={this.state.user} isCurrentUserPage={this.isCurrentUserPage} createFollow={this.createFollow} deleteFollow={this.deleteFollow} loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} isFollowing={this.state.isFollowing} />
        <div>
          {userContent}
        </div>
      </div>
    );
  }
}
