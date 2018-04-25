import React from 'react';
import { shallow } from 'enzyme';
import { Account } from '.';

describe(Account, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '123', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  const editMock = jest.fn();
  const deleteMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<Account loggedIn={true} currentUser={currentUser} editUser={editMock} deleteAccount={deleteMock} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
