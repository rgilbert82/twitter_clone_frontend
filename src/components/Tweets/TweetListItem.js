import React from 'react';
import { Link } from 'react-router-dom';

export default class TweetListItem extends React.Component {
  constructor(props) {
    super(props);

    this.formatDatetime = this.formatDatetime.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.navigateToTweet = this.navigateToTweet.bind(this);
  }

  formatDatetime(dt) {
    let dateTime = new Date(dt).toDateString() + ' ' +
                   new Date(dt).toLocaleTimeString();

    return dateTime;
  }

  deleteTweet(e) {
    e.preventDefault();

    if (window.confirm('Are you sure?')) {
      if(this.props.tweet.retweet) {
        this.props.deleteRetweet(this.props.tweet.retweet_id);
      } else {
        this.props.deleteTweet(this.props.tweet.id);
      }
    }
  }

  navigateToTweet(e) {
    const path = `/users/${this.props.tweet.user_slug}/${this.props.tweet.slug}`;

    if (e.target.tagName.toLowerCase() !== "a") {
      this.props.history.push(path);
    }
  }

  render() {
    let deleteLink;
    let component;
    let tweetImage;

    if (this.props.tweet.image) {
      tweetImage = (
        <div className="tweet_image tweet_list_item_image">
          <img src={this.props.tweet.image} alt="user uploaded pic" />
        </div>
      );
    }

    if (!!this.props.isCurrentUserPage && !!this.props.isCurrentUserPage()) {
      deleteLink = (<a href="#" onClick={this.deleteTweet}>Delete</a>);
    }

    if (this.props.tweet.retweet) {
      let retweet_user_path = `/users/${this.props.tweet.user_slug}`;
      component = (
        <div className="tweet_list_item">
          <div className="inner_tweet_list_item retweet_list_item" onClick={this.navigateToTweet} >
            <h5>Tweeted by <Link to={retweet_user_path}>@{this.props.tweet.username}</Link> <small><span>on</span> <b>{this.formatDatetime(this.props.tweet.tweet_created_at)}</b></small></h5>
            <p className="tweet_body_text" onClick={this.props.navigateToSearch}>{this.props.tweet.body}</p>
            {tweetImage}
          </div>
          <div className="tweet_list_item_footer">
            <small className="list_item_datetime">{this.formatDatetime(this.props.tweet.created_at)}</small>
          </div>
          <div className="tweet_list_item_buttons">
            {deleteLink}
          </div>
        </div>
      );
    } else {
      component = (
        <div className="tweet_list_item">
          <div className="inner_tweet_list_item" onClick={this.navigateToTweet} >
            <p className="tweet_body_text" onClick={this.props.navigateToSearch}>{this.props.tweet.body}</p>
            {tweetImage}
          </div>
          <div className="tweet_list_item_footer">
            <small className="list_item_datetime">{this.formatDatetime(this.props.tweet.created_at)}</small>
          </div>
          <div className="tweet_list_item_buttons">
            {deleteLink}
          </div>
        </div>
      );
    }

    return (
      <div>
        { component }
      </div>
    );
  }
}
