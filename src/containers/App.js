import React from 'react';
import { Header, Main, Sidebar } from '.';
import { MessageWindow } from '../components/Misc';
import { SearchBar } from '../components/Search';
import { getCurrentUserAPI } from '../services/api/sessions';
import { createUserAPI, updateUserAPI, deleteUserAPI } from '../services/api/users';
import { getToken, setToken, deleteToken } from '../services/sessions';
import { Grid, Col } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      loggedIn: undefined,
      hasMessage: false,
      currentUserChange: false,
      message: 'Oops! Something went wrong!'
    };

    this.appLogin = this.appLogin.bind(this);
    this.appLogout = this.appLogout.bind(this);
    this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.navigateToSearch = this.navigateToSearch.bind(this);
    this.redirectToSearch = this.redirectToSearch.bind(this);
    this.lowerTweetCount = this.lowerTweetCount.bind(this);
    this.raiseTweetCount = this.raiseTweetCount.bind(this);
    this.raiseSidebarFollowingCount = this.raiseSidebarFollowingCount.bind(this);
    this.lowerSidebarFollowingCount = this.lowerSidebarFollowingCount.bind(this);
  }

  componentWillMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    const token = getToken();

    if (token) {
      return getCurrentUserAPI()
        .then((data) => {
          data.all_tweet_count = Number(data.tweet_count) + Number(data.retweet_count);
          this.setState({ currentUser: data, loggedIn: true });
        }).catch(() => {
          this.appLogout();
        });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  createUser(userData) {
    return createUserAPI(userData)
      .then((data) => {
        data.following = "0";
        data.followers = "0";
        data.tweet_count = "0";
        data.retweet_count = "0";
        data.all_tweet_count = "0";
        setToken(data.token);
        this.setState({ currentUser: data, loggedIn: true });
      }).catch(() => {
        this.displayMessage('There was an error creating the user');
      });
  }

  editUser(userData) {
    return updateUserAPI(userData)
      .then((data) => {
        data.following = this.state.currentUser.following;
        data.followers = this.state.currentUser.followers;
        data.tweet_count = this.state.currentUser.tweet_count;
        data.retweet_count = this.state.currentUser.retweet_count;
        data.all_tweet_count = this.state.currentUser.all_tweet_count;
        this.setState({ currentUser: data });
        this.displayMessage('You successfully updated your account!');
      }).catch(() => {
        this.displayMessage('There was an error updating the user');
      });
  }

  deleteAccount(userId) {
    return deleteUserAPI(userId)
      .then(() => {
        this.appLogout();
      }).catch(() => {
        this.displayMessage('There was an error deleting the account');
      });
  }

  raiseTweetCount() {
    let updatedUser = this.state.currentUser;

    if (updatedUser.all_tweet_count) {
      updatedUser.all_tweet_count = Number(updatedUser.all_tweet_count) + 1;
    } else {
      updatedUser.all_tweet_count = 1;
    }

    this.setState({ currentUser: updatedUser, currentUserChange: !this.state.currentUserChange });
  }

  lowerTweetCount() {
    let updatedUser = this.state.currentUser;

    if (updatedUser.all_tweet_count) {
      updatedUser.all_tweet_count = Number(updatedUser.all_tweet_count) - 1;
    }

    this.setState({ currentUser: updatedUser });
  }

  raiseSidebarFollowingCount() {
    let updatedUser = this.state.currentUser;

    if (updatedUser.all_tweet_count) {
      updatedUser.following = Number(updatedUser.following) + 1;
    } else {
      updatedUser.following = 1;
    }

    this.setState({ currentUser: updatedUser });
  }

  lowerSidebarFollowingCount() {
    let updatedUser = this.state.currentUser;

    if (updatedUser.all_tweet_count) {
      updatedUser.following = Number(updatedUser.following) - 1;
    }

    this.setState({ currentUser: updatedUser });
  }

  appLogin(token) {
    setToken(token);
    this.fetchCurrentUser();
  }

  appLogout() {
    deleteToken();
    this.setState({ loggedIn: false });
  }

  displayMessage(message) {
    this.setState({ message: message, hasMessage: true });
  }

  closeMessage() {
    this.setState({ hasMessage: false });
  }

  navigateToSearch(e) {
    let searchField;

    if (e.target.tagName.toLowerCase() === "a") {
      e.preventDefault();
      searchField = e.target.innerText.replace(/^#/, '');
      this.redirectToSearch(searchField);
    }
  }

  redirectToSearch(searchField) {
    const searchPath = `/search/${searchField}`;
    this.props.history.push(searchPath);
  }

  render() {
    let messageWindow = <div></div>;

    if (this.state.hasMessage) {
      messageWindow = <MessageWindow message={this.state.message} closeMessage={this.closeMessage} />
    }

    return (
      <div>
        <Header currentUser={this.state.currentUser} loggedIn={this.state.loggedIn } appLogin={this.appLogin} appLogout={this.appLogout} displayMessage={this.displayMessage} />
        {messageWindow}
        <SearchBar redirectToSearch={this.redirectToSearch} />
        <Grid id="main_grid">
          <Sidebar loggedIn={this.state.loggedIn} currentUser={this.state.currentUser} raiseSidebarTweetCount={this.raiseTweetCount} displayMessage={this.displayMessage} />
          <Main loggedIn={this.state.loggedIn} currentUser={this.state.currentUser}
            currentUserChange={this.state.currentUserChange} createUser={this.createUser}
            editUser={this.editUser} deleteAccount={this.deleteAccount}
            displayMessage={this.displayMessage} navigateToSearch={this.navigateToSearch}
            lowerTweetCount={this.lowerTweetCount} raiseTweetCount={this.raiseTweetCount}
            raiseSidebarFollowingCount={this.raiseSidebarFollowingCount}
            lowerSidebarFollowingCount={this.lowerSidebarFollowingCount} />
          <Col className="empty_sidebar" xs={4} md={3}></Col>
        </Grid>
      </div>
    );
  }
}
