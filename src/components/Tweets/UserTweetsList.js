import React from 'react';
import { TweetListItem } from '.';
import { PageLoading } from '../Misc';
import { getUserTweetsAPI } from '../../services/api/users';
import { deleteTweetAPI } from '../../services/api/tweets';
import { hashtagify, randomString } from '../../services/misc';
import { deleteRetweetAPI } from '../../services/api/retweets';

export default class UserTweetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetsFeed: [],
      tweetsLoaded: false
     };
    this.fetchTweets = this.fetchTweets.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.deleteRetweet = this.deleteRetweet.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.fetchTweets();
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    this._isMounted = false;
  }

  componentDidUpdate() {
    const elements = document.getElementsByClassName('tweet_body_text');

    for(let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = hashtagify(elements[i].innerHTML);
    }
  }

  scrollListener() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      if (this.state.tweetsFeed.length < this.state.tweets.length) {
        this.setState({ tweetsFeed: this.state.tweets.slice(0, this.state.tweetsFeed.length + 8)});
      }
    }
  }

  fetchTweets() {
    let tweetData;

    return getUserTweetsAPI(this.props.user_id)
      .then((data) => {
        if (this._isMounted) {
          tweetData = data.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at); });
          this.setState({ tweets: tweetData, tweetsFeed: tweetData.slice(0, 8), tweetsLoaded: true });
        }
      }).catch(() => {
        if (this._isMounted) {
          this.props.displayMessage('There was an error loading the tweets');
        }
      });
  }

  deleteTweet(tweetID) {
    return deleteTweetAPI(tweetID)
      .then(() => {
        this.setState({
          tweets: this.state.tweets.filter((tweet) => { return tweet.id !== tweetID }),
          tweetsFeed: this.state.tweetsFeed.filter((tweet) => { return tweet.id !== tweetID })
         });
        this.props.lowerTweetCount();
      }).catch(() => {
        this.props.displayMessage('There was an error deleting the tweet');
      });
  }

  deleteRetweet(retweetID) {
    return deleteRetweetAPI(retweetID)
      .then(() => {
        this.setState({
          tweets: this.state.tweets.filter((tweet) => { return tweet.retweet_id !== retweetID }),
          tweetsFeed: this.state.tweetsFeed.filter((tweet) => { return tweet.retweet_id !== retweetID })
         });
        this.props.lowerTweetCount();
      }).catch(() => {
        this.props.displayMessage('There was an error deleting the retweet');
      });
  }

  render() {
    let allTweets;

    if (this.state.tweetsLoaded) {
      allTweets = this.state.tweetsFeed.map((tweet) => {
        let keyID;

        if (tweet.retweet) {
          keyID = randomString(5);
        } else {
          keyID = tweet.id;
        }

        return (
          <li className="list_item" key={keyID}>
            <TweetListItem history={this.props.history} tweet={tweet} loggedIn={this.props.loggedIn} isCurrentUserPage={this.props.isCurrentUserPage} displayMessage={this.props.displayMessage} deleteTweet={this.deleteTweet} deleteRetweet={this.deleteRetweet} navigateToSearch={this.props.navigateToSearch} />
          </li>
        );
      });

      return (
        <div>
          <h2 className="sub_header">Tweets</h2>
          <ul>
            {allTweets}
          </ul>
        </div>
      );
    } else {
      return <PageLoading />;
    }
  }
}
