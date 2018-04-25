import React from 'react';
import { AllUsers, UserProfile } from '../components/Users';
import { Account, Register } from '../components/CurrentUser';
import { SearchMain } from '../components/Search';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-bootstrap';

export default class Main extends React.Component {
  render() {
    return (
      <Col id="main" xs={12} md={7}>
        <Switch>
          <Route exact path='/' render={() => <AllUsers displayMessage={this.props.displayMessage} /> } />
          <Route exact path='/register' render={() => <Register loggedIn={this.props.loggedIn} createUser={this.props.createUser} />} />
          <Route exact path='/account' render={() => <Account loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} editUser={this.props.editUser} deleteAccount={this.props.deleteAccount} />} />
          <Route path='/search/' render={() => <SearchMain loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} displayMessage={this.props.displayMessage} navigateToSearch={this.props.navigateToSearch} /> } />
          <Route path='/users/:slug' render={(props) => <UserProfile {...props}
            loggedIn={this.props.loggedIn}
            currentUser={this.props.currentUser}
            currentUserChange={this.props.currentUserChange}
            displayMessage={this.props.displayMessage}
            navigateToSearch={this.props.navigateToSearch}
            lowerSidebarTweetCount={this.props.lowerTweetCount}
            raiseSidebarTweetCount={this.props.raiseTweetCount}
            raiseSidebarFollowingCount={this.props.raiseSidebarFollowingCount}
            lowerSidebarFollowingCount={this.props.lowerSidebarFollowingCount} />} />
        </Switch>
      </Col>
    );
  }
}
