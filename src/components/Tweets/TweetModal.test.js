jest.mock('../../services/api/tweets');
jest.mock('../../services/api/comments');

import React from 'react';
import { shallow } from 'enzyme';
import { TweetModal } from '.';
import { getTweetAPI, editTweetAPI, deleteTweetAPI } from '../../services/api/tweets';
import { getCommentsAPI, createCommentAPI, deleteCommentAPI } from '../../services/api/comments';

describe(TweetModal, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  let fetchTweetSpy = jest.spyOn(TweetModal.prototype, 'fetchTweet');
  let fetchCommentsSpy = jest.spyOn(TweetModal.prototype, 'fetchComments');
  let component;

  beforeEach(() => {
    component = shallow(<TweetModal match={{params: { tweet_slug: 'tweet'}}} prevPath='/' loggedIn={true} currentUser={currentUser} displayMessage={jest.fn()} />);
  });

  afterAll(() => {
    fetchTweetSpy.mockClear();
    fetchCommentsSpy.mockClear();
  })

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchTweetSpy on mount", () => {
    expect(fetchTweetSpy).toHaveBeenCalled();
  });

  it("fetches the tweets", () => {
    expect.assertions(2);
    component.instance().fetchTweet()
      .then(() => {
        expect(component.state('tweet')).toEqual({ id: 1, body: 'Hello World', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' });
        expect(fetchCommentsSpy).toHaveBeenCalled();
      });
  });

  it("fetches the comments", () => {
    expect.assertions(2);
    component.setState({ tweet: { id: 3, body: 'Hello World', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' } });
    component.instance().fetchComments()
      .then(() => {
        expect(component.state('comments')).toEqual([{id: 1, user_id: 2, tweet_id: 3, body: 'Hello World', name: 'Ryan', username: 'RG', slug: 'rg'}]);
        expect(component.state('tweetLoaded')).toEqual(true);
      });
  });

  it("creates a comment", () => {
    expect.assertions(1);
    component.setState({ tweeLoaded: true, tweet: { id: 3, body: 'Hello World', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' } });
    component.instance().createNewComment()
      .then(() => {
        expect(component.state('comments')).toEqual([{id: 1, user_id: 2, tweet_id: 3, body: 'Hello World', name: 'Ryan', username: 'RG', slug: 'rg' }]);
      });
  });

  it("updates the tweet", () => {
    expect.assertions(1);
    component.setState({ tweeLoaded: true, tweet: { id: 1, body: 'Hello World', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' } });
    component.instance().editTweetBody("UPDATED")
      .then(() => {
        expect(component.state('tweet')).toEqual({ id: 1, body: 'UPDATED', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' })
      });
  });
});
