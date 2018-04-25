jest.mock('../services/api/sessions');
jest.mock('../services/api/users');

import React from 'react';
import { App } from '.';
import { shallow } from 'enzyme';
import { getCurrentUserAPI } from '../services/api/sessions';
import { createUserAPI, updateUserAPI, deleteUserAPI } from '../services/api/users';

describe(App, () => {
  let fetchCurrentUserSpy = jest.spyOn(App.prototype, 'fetchCurrentUser');
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  afterAll(() => {
    fetchCurrentUserSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchCurrentUserSpy on mount", () => {
    expect(fetchCurrentUserSpy).toHaveBeenCalled();
  });

  it("fetches the current user", () => {
    expect.assertions(2);
    component.instance().appLogin('12345');
    component.instance().fetchCurrentUser()
      .then(() => {
        expect(component.state('loggedIn')).toEqual(true);
        expect(component.state('currentUser')).toEqual({ id: 1, name: 'Ryan', username: 'RG', token: '123', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 });
      });
  });

  it("creates a new user", () => {
    expect.assertions(2);
    component.instance().createUser()
      .then(() => {
        expect(component.state('loggedIn')).toEqual(true);
        expect(component.state('currentUser')).toEqual({ id: 1, name: 'Ryan', username: 'RG', password: 'password', token: '12345', slug: 'rg', followers: "0", following: "0", tweet_count: "0", retweet_count: "0", all_tweet_count: "0" });
      });
  });

  it("updates a user", () => {
    expect.assertions(1);
    component.setState({ currentUser: { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 }});
    component.instance().editUser()
      .then(() => {
        expect(component.state('currentUser')).toEqual({ id: 1, name: 'RYAN', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 });
      });
  });

  it("deletes a user", () => {
    expect.assertions(2);
    component.instance().appLogin('12345');
    expect(component.state('loggedIn')).toEqual(true);
    component.instance().deleteAccount(1)
      .then(() => {
        expect(component.state('loggedIn')).toEqual(false);
      });
  });

  it("logs out", () => {
    component.setState({ loggedIn: true });
    expect(component.state('loggedIn')).toEqual(true);
    component.instance().appLogout();
    expect(component.state('loggedIn')).toEqual(false);
  });
});
