import React from 'react';
import { shallow } from 'enzyme';
import { Sidebar } from '.';

describe(Sidebar, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  let component;

  beforeEach(() => {
    component = shallow(<Sidebar loggedIn={true} currentUser={currentUser} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("toggles the form", () => {
    expect(component.state('formToggle')).toEqual(false);
    component.instance().toggleTweetForm();
    expect(component.state('formToggle')).toEqual(true);
  });
});
