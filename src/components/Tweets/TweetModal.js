import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TweetCommentListItem, CreateCommentForm, EditTweet } from '.';
import { PageLoading, DarkLayer } from '../Misc';
import { hashtagify } from '../../services/misc';
import { getTweetAPI, editTweetAPI, deleteTweetAPI } from '../../services/api/tweets';
import { deletePhoto } from '../../services/aws';
import { createRetweetAPI } from '../../services/api/retweets';
import { getCommentsAPI, createCommentAPI, deleteCommentAPI } from '../../services/api/comments';
import { Button } from 'react-bootstrap';

export default class TweetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: {},
      comments: [],
      tweetLoaded: false,
      tweetDeleted: false
    };

    this.fetchTweet = this.fetchTweet.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.createNewComment = this.createNewComment.bind(this);
    this.createRetweet = this.createRetweet.bind(this);
    this.editTweetBody = this.editTweetBody.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.formatDatetime = this.formatDatetime.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.fetchTweet();
    }
  }

  componentDidUpdate() {
    const elements = document.getElementsByClassName('tweet_body_text');

    for(let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = hashtagify(elements[i].innerHTML);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchTweet() {
    return getTweetAPI(this.props.match.params.tweet_slug)
      .then((data) => {
        if (this._isMounted) {
          this.setState({ tweet: data });
          this.fetchComments();
        }
      }).catch(() => {
        if (this._isMounted) {
          this.props.displayMessage('There was an error loading the tweet');
        }
      });
  }

  fetchComments() {
    return getCommentsAPI(this.state.tweet.id)
      .then((data) => {
        this.setState({ comments: data, tweetLoaded: true });
      }).catch(() => {
        this.props.displayMessage('There was an error loading the comments')
      });
  }

  createRetweet() {
    const userPath = `/users/${this.props.currentUser.slug}`;

    return createRetweetAPI(this.state.tweet.id)
      .then((data) => {
        this.props.raiseSidebarTweetCount();
        this.props.history.push(userPath);
      }).catch(() => {
        this.props.displayMessage('There was an error retweeting');
      });
  }

  createNewComment(commentBody) {
    let commentData;

    if (this.props.loggedIn && this.state.tweetLoaded) {
      commentData = { body: commentBody, user_id: this.props.currentUser.id, tweet_id: this.state.tweet.id };
      return createCommentAPI(commentData)
        .then((data) => {
          this.setState({
            comments: this.state.comments.concat([data])
          });
        }).catch(() => {
          this.props.displayMessage('There was an error creating the comment');
        });
    }
  }

  editTweetBody(tweetObj) {
    let oldData = this.state.tweet;
    let oldImage = oldData.image;
    const tweetData = {
      body: tweetObj.body,
      image: tweetObj.image,
      user_id: this.state.tweet.user_id,
      id: this.state.tweet.id
    };

    return editTweetAPI(tweetData)
      .then((data) => {
        oldData.body = data.body;
        oldData.image = data.image;
        this.setState({ tweet: oldData });
        if (oldImage.length > 0 && oldImage !== oldData.image) {
          oldImage = oldImage.replace('https://rg-tweeter.s3.amazonaws.com/', '');
          deletePhoto(oldImage);
        }
      }).catch(() => {
        this.props.displayMessage('There was an error updating the tweet');
      });
  }

  deleteTweet() {
    let tweetImage = this.state.tweet.image;

    if (this.state.tweetLoaded) {
      return deleteTweetAPI(this.state.tweet.id)
        .then(() => {
          if (tweetImage) {
            tweetImage = tweetImage.replace('https://rg-tweeter.s3.amazonaws.com/', '');
            deletePhoto(tweetImage);
          }
          this.setState({ tweetDeleted: true });
        }).catch(() => {
          this.props.displayMessage('There was an error deleting the tweet');
        });
    }
  }

  deleteComment(commentID) {
    return deleteCommentAPI(commentID)
      .then(() => {
        this.setState({ comments: this.state.comments.filter((c) => { return c.id !== commentID })});
      }).catch(() => {
        this.props.displayMessage('There was an error deleting the comment');
      });
  }

  formatDatetime(dt) {
    let dateTime = new Date(dt).toDateString() + ' ' +
                   new Date(dt).toLocaleTimeString();

    return dateTime;
  }

  navigateToProfile() {
    const userPath = `/users/${this.state.tweet.user_slug}`;
    this.props.history.push(userPath);
  }

  render() {
    const hasTopBorder = this.state.comments.length > 0 ? "has_top_border" : "";
    let commentSection;
    let addNewComment;
    let retweetLink;
    let tweetImage;
    let userPath;
    let editBox;
    let commentsList = this.state.comments.map((comment) => {
      return <li className="list_item comment_list_item" key={comment.id}><TweetCommentListItem comment={comment} loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} deleteComment={this.deleteComment} displayMessage={this.props.displayMessage} /></li>;
    });

    if (this.state.tweet.image) {
      tweetImage = (
        <div className="tweet_image">
          <img src={this.state.tweet.image} alt="user uploaded pic" />
        </div>
      );
    }

    if (this.props.loggedIn && this.state.tweetLoaded) {
      addNewComment = <CreateCommentForm createNewComment={this.createNewComment} />;
      if (!this.props.isCurrentUserPage()) {
        retweetLink = (<div><Button onClick={this.createRetweet}>Retweet</Button></div>);
      }
    }

    if (this.props.loggedIn && this.state.tweetLoaded && this.props.isCurrentUserPage()) {
      editBox = <EditTweet body={this.state.tweet.body} editTweetBody={this.editTweetBody} deleteTweet={this.deleteTweet} displayMessage={this.props.displayMessage} currentUser={this.props.currentUser} />;
    }

    if (this.state.tweetLoaded) {
      commentSection = (
        <div>
          <h2 className="tweet_sub_header sub_header">Comments</h2>
          {addNewComment}
          <ul className={hasTopBorder}>
            {commentsList}
          </ul>
        </div>
      );
    } else {
      commentSection = <PageLoading />;
    }

    if (this.state.tweetDeleted) {
      userPath = `/users/${this.state.tweet.user_slug}`;
      return <Redirect to={userPath} />
    } else {
      userPath = `/users/${this.state.tweet.user_slug}`;

      return (
        <div id="modal_wrapper">
          <DarkLayer closeModal={this.navigateToProfile} />
          <div id="tweet_modal">
            <h1 className="tweet_header">{this.state.tweet.name}<span>@{this.state.tweet.username}</span></h1>
            <div>
              <div className="inner_tweet_list_item tweet_modal_body">
                <p onClick={this.props.navigateToSearch} className="tweet_body_text">{this.state.tweet.body}</p>
                {tweetImage}
              </div>
              <div className="tweet_modal_buttons">
                {retweetLink}
                {editBox}
              </div>
              <div className="tweet_list_item_footer">
                <small className="list_item_datetime">{this.formatDatetime(this.state.tweet.created_at)}</small>
              </div>
              <Link to={userPath}>{this.state.tweet.username}'s Profile</Link>
            </div>
            <div>
              {commentSection}
            </div>
          </div>
        </div>
      );
    }
  }
}
