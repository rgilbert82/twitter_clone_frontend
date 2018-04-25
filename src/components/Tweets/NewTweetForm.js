import React from 'react';
import { DarkLayer } from '../Misc';
import { createTweetAPI } from '../../services/api/tweets';
import { uploadPhoto } from '../../services/aws';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

export default class NewTweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweetCreated: false, tweetBody: '' };
    this.updateBody = this.updateBody.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.createTweet = this.createTweet.bind(this);
    this.uploadPhotoBeforeCreatingTweet = this.uploadPhotoBeforeCreatingTweet.bind(this);
  }

  updateBody(e) {
    this.setState({ tweetBody: e.target.value });
  }

  isValidForm() {
    return this.state.tweetBody.trim().length > 0;
  }

  createTweet(photoPath) {
    return createTweetAPI({ body: this.state.tweetBody, user_id: this.props.currentUser.id, image: photoPath })
      .then(() => {
        this.props.toggleTweetForm();
        this.props.raiseSidebarTweetCount();
      }).catch(() => {
        this.props.displayMessage('There was an error creating the tweet');
      });
  }

  uploadPhotoBeforeCreatingTweet() {
    return uploadPhoto(this.props.currentUser.id)
      .then((photoPath) => {
        this.createTweet(photoPath);
      }).catch((err) => {
        this.props.displayMessage('There was an error uploading your image');
      });
  }

  render() {
    let component;

    if (this.state.tweetCreated) {
      component = <Redirect to='/' />
    } else {
      component = (
        <div id="modal_wrapper">
          <DarkLayer closeModal={this.props.toggleTweetForm} />
          <div id="new_tweet_form">
            <div className="modal_header">
              <h1>Compose new Tweet</h1>
            </div>
            <div className="modal_body">
              <FormGroup>
                <FormControl componentClass="textarea" id="form_body" maxLength="140" value={this.state.tweetBody} onChange={this.updateBody} placeholder="What's happening?"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel htmlFor="photo_upload">Add an image</ControlLabel>
                <FormControl type="file" id="photo_upload" accept="image/*" />
              </FormGroup>
              <Button id="toggleForm" onClick={this.props.toggleTweetForm}>Cancel</Button>
              <Button id="submitForm" disabled={!this.isValidForm()} onClick={this.uploadPhotoBeforeCreatingTweet} >Tweet</Button>
            </div>
          </div>
        </div>
      );
    }

    return component;
  }
}
