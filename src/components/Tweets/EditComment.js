import React from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

export default class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBody: this.props.body,
      editable: false
     };

     this.toggleForm = this.toggleForm.bind(this);
     this.updateComment = this.updateComment.bind(this);
     this.editComment = this.editComment.bind(this);
     this.deleteComment = this.deleteComment.bind(this);
     this.validForm = this.validForm.bind(this);
  }

  toggleForm() {
    this.setState({
      editBody: this.props.body,
      editable: !this.state.editable
    });
  }

  updateComment(e) {
    this.setState({ editBody: e.target.value });
  }

  validForm() {
    return this.state.editBody.length > 0;
  }

  editComment() {
    this.setState({ editable: false });
    this.props.editCommentBody(this.state.editBody);
  }

  deleteComment() {
    if (window.confirm('Are you sure?')) {
      this.props.deleteComment();
    }
  }

  render() {
    let component;

    if (this.state.editable) {
      component = (
        <div>
          <FormGroup>
            <FormControl componentClass="textarea" id="form_body" maxLength="140" onChange={this.updateComment} value={this.state.editBody} placeholder='Edit your comment'/>
          </FormGroup>
          <div id="edit_tweet_buttons">
            <Button id="submitForm" onClick={this.editComment} disabled={!this.validForm()}>Submit</Button>
            <Button className="formToggle" onClick={this.toggleForm}>Cancel</Button>
            <Button id="deleteTweet" onClick={this.deleteComment}>Delete</Button>
          </div>
        </div>
      );
    } else {
      component = (
        <div>
          <Button className="formToggle" onClick={this.toggleForm}>Edit</Button>
        </div>
      );
    }

    return component;
  }
}
