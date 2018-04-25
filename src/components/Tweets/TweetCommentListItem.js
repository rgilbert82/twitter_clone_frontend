import React from 'react';
import { EditComment } from '.';
import { editCommentAPI } from '../../services/api/comments';
import { Link } from 'react-router-dom';

export default class TweetCommentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: this.props.comment.body };
    this.editCommentBody = this.editCommentBody.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.formatDatetime = this.formatDatetime.bind(this);
  }

  formatDatetime(dt) {
    let dateTime = new Date(dt).toDateString() + ' ' +
                   new Date(dt).toLocaleTimeString();

    return dateTime;
  }

  editCommentBody(newBody) {
    const commentData = {
      body: newBody,
      user_id: this.props.comment.user_id,
      id: this.props.comment.id
    };

    return editCommentAPI(commentData)
      .then((data) => {
        this.setState({ body: data.body });
      }).catch(() => {
        this.props.displayMessage('There was an error updating the comment');
      });
  }

  deleteComment() {
    this.props.deleteComment(this.props.comment.id);
  }

  render() {
    const userPath = `/users/${this.props.comment.slug}`;
    let editBox;

    if (this.props.loggedIn && this.props.comment.user_id === this.props.currentUser.id) {
      editBox = <EditComment body={this.props.comment.body} editCommentBody={this.editCommentBody} deleteComment={this.deleteComment} />;
    }

    return (
      <div>
        <div className="inner_tweet_list_item tweet_comment_list_item">
          <h5><Link to={userPath}>@{this.props.comment.username}</Link> <small><span>on</span> <b>{this.formatDatetime(this.props.comment.created_at)}</b></small></h5>
          <p className="tweet_body_text">{this.state.body}</p>
        </div>
        <div className="tweet_modal_buttons">
          {editBox}
        </div>
      </div>
    );
  }
}
