import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

export default class CreateCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' }
    this.updateBody = this.updateBody.bind(this);
    this.createComment = this.createComment.bind(this);
    this.validForm = this.validForm.bind(this);
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  createComment() {
    this.props.createNewComment(this.state.body);
    this.setState({ body: '' });
  }

  validForm() {
    return this.state.body.length > 0;
  }

  render() {
    return (
      <div id="create_comment_form">
        <FormGroup>
          <FormControl componentClass="textarea" id="form_body" onChange={this.updateBody} value={this.state.body} placeholder='Create a comment'/>
        </FormGroup>
        <Button id="submit_comment_form" disabled={!this.validForm()} onClick={this.createComment}>Submit</Button>
      </div>
    );
  }
}
