import React from 'react';
import { uploadPhoto } from '../../services/aws';
import { FormControl, FormGroup, Button, ControlLabel } from 'react-bootstrap';

export default class EditTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBody: this.props.body,
      editable: false
     };

     this.toggleForm = this.toggleForm.bind(this);
     this.updateTweet = this.updateTweet.bind(this);
     this.editTweet = this.editTweet.bind(this);
     this.validForm = this.validForm.bind(this);
     this.deleteTweet = this.deleteTweet.bind(this);
     this.uploadPhotoBeforeCreatingTweet = this.uploadPhotoBeforeCreatingTweet.bind(this);
  }

  toggleForm() {
    this.setState({
      editBody: this.props.body,
      editable: !this.state.editable
    });
  }

  updateTweet(e) {
    this.setState({ editBody: e.target.value });
  }

  validForm() {
    return this.state.editBody.length > 0;
  }

  uploadPhotoBeforeCreatingTweet() {
    return uploadPhoto(this.props.currentUser.id)
      .then((photoPath) => {
        this.editTweet(photoPath);
      }).catch((err) => {
        this.props.displayMessage('There was an error uploading your image');
      });
  }

  editTweet(photoPath) {
    this.setState({ editable: false });
    this.props.editTweetBody({ body: this.state.editBody, image: photoPath});
  }

  deleteTweet() {
    if (window.confirm('Are you sure?')) {
      this.props.deleteTweet();
    }
  }

  render() {
    let component;

    if (this.state.editable) {
      component = (
        <div>
          <FormGroup>
            <FormControl componentClass="textarea" id="form_body" maxLength="140" onChange={this.updateTweet} value={this.state.editBody} placeholder='Edit your tweet'/>
          </FormGroup>
          <FormGroup className="photo_upload_modal_wrapper">
            <ControlLabel htmlFor="photo_upload">Change your image</ControlLabel>
            <FormControl type="file" id="photo_upload" className="photo_upload_modal" accept="image/*" />
          </FormGroup>
          <div id="edit_tweet_buttons">
            <Button id="submitForm" onClick={this.uploadPhotoBeforeCreatingTweet} disabled={!this.validForm()}>Submit</Button>
            <Button className="formToggle" onClick={this.toggleForm}>Cancel</Button>
            <Button id="deleteTweet" onClick={this.deleteTweet}>Delete</Button>
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
