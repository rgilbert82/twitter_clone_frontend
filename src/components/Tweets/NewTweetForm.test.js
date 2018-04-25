jest.mock('../../services/api/tweets');
jest.mock('../../services/aws');

import React from 'react';
import { shallow } from 'enzyme';
import { NewTweetForm } from '.';
import { createTweetAPI } from '../../services/api/tweets';
import { uploadPhoto } from '../../services/aws';

describe(NewTweetForm, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  const toggleMock = jest.fn();
  let createSpy = jest.spyOn(NewTweetForm.prototype, 'uploadPhotoBeforeCreatingTweet');
  let component;

  beforeEach(() => {
    component = shallow(<NewTweetForm currentUser={currentUser} toggleTweetForm={toggleMock} displayMessage={jest.fn()} />);
  });

  afterAll(() => {
    createSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("toggles the form", () => {
    component.find('#toggleForm').simulate('click');
    expect(toggleMock).toBeCalled();
  });

  it("updates the body", () => {
    expect(component.state('tweetBody')).toEqual('');
    component.find('#form_body').simulate('change', { target: { value: 'Hello' }});
    expect(component.state('tweetBody')).toEqual('Hello');
  });

  it("is a valid form", () => {
    expect(component.instance().isValidForm()).toEqual(false);
    component.find('#form_body').simulate('change', { target: { value: 'Hello' }});
    expect(component.instance().isValidForm()).toEqual(true);
  });

  it("calls the createTweet function", () => {
    component.find('#form_body').simulate('change', { target: { value: 'Hello' }});
    component.find('#submitForm').simulate('click');
    expect(createSpy).toHaveBeenCalled();
  });

  it("creates the tweet", () => {
    expect.assertions(1);
    component.setState({ tweetBody: 'Hello' });
    component.instance().createTweet()
      .then(() => {
        expect(toggleMock).toBeCalled();
      });
  });
});
