jest.mock('../../services/api/comments');

import React from 'react';
import { shallow } from 'enzyme';
import { TweetCommentListItem } from '.';
import { editCommentAPI } from '../../services/api/comments';

describe(TweetCommentListItem, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  const comentData = { id: 1, user_id: 1, body: 'Hello' };
  const deleteMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<TweetCommentListItem comment={comentData} loggedIn={true} currentUser={currentUser} deleteComment={deleteMock} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("edits the comment", () => {
    expect.assertions(1);
    component.instance().editCommentBody('Hello World')
      .then(() => {
        expect(component.state('body')).toEqual('Hello World');
      });
  });

  it("deletes the comment", () => {
    component.instance().deleteComment();
    expect(deleteMock).toBeCalled();
  });
});
