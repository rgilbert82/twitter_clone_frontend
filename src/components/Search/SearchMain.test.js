import React from 'react';
import { shallow } from 'enzyme';
import { SearchMain } from '.';

describe(SearchMain, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  let component;

  beforeEach(() => {
    component = shallow(<SearchMain loggedIn={true} currentUser={currentUser} displayMessage={jest.fn()} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
