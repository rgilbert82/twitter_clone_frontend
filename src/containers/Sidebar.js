import React from 'react';
import { Link } from 'react-router-dom';
import { NewTweetForm } from '../components/Tweets';
import { Button, Col } from 'react-bootstrap';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formToggle: false };
    this.toggleTweetForm = this.toggleTweetForm.bind(this);
  }

  toggleTweetForm() {
    this.setState({ formToggle: !this.state.formToggle });
  }

  render() {
    const userPath = `/users/${this.props.currentUser.slug}`;
    let tweetForm;

    if (this.state.formToggle) {
      tweetForm = <NewTweetForm toggleTweetForm={this.toggleTweetForm} currentUser={this.props.currentUser} displayMessage={this.props.displayMessage} raiseSidebarTweetCount={this.props.raiseSidebarTweetCount} />;
    }

    let component;

    if (this.props.loggedIn) {
      component = (
        <Col id="left_sidebar" xs={4} md={3}>
          <div className="blue_top">
          </div>
          <div id="user_sidebar">
            <div className="user_profile_info">
              <h3><Link to={userPath}>{this.props.currentUser.name}</Link></h3>
              <aside>@<Link to={userPath}>{this.props.currentUser.username}</Link></aside>
            </div>
            <div className="user_stats user_profile_info">
              <dl>
                <dt>Tweets</dt>
                <dd>{this.props.currentUser.all_tweet_count}</dd>
              </dl>
              <dl>
                <dt>Following</dt>
                <dd>{this.props.currentUser.following}</dd>
              </dl>
              <dl>
                <dt>Followers</dt>
                <dd>{this.props.currentUser.followers}</dd>
              </dl>
            </div>
            <div className="user_profile_info">
              <Button onClick={this.toggleTweetForm}>Tweet</Button>
            </div>
          </div>
          {tweetForm}
        </Col>
      );
    } else {
      component = <Col className="empty_sidebar" xs={4} md={3}></Col>;
    }

    return component;
  }
}
