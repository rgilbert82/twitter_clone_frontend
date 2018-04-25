jest.mock('../../services/api/users');
jest.mock('../../services/api/follows');

import React from 'react';
import { UserProfile } from '.';
import { shallow } from 'enzyme';
import { getUserAPI } from '../../services/api/users';
import { getFollowAPI, createFollowAPI, deleteFollowAPI } from '../../services/api/follows';

describe(UserProfile, () => {
  let fetchSpy = jest.spyOn(UserProfile.prototype, 'fetchUser');
  let component;

  beforeEach(() => {
    component = shallow(<UserProfile match={ { params: { id: 5 } }}/>);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchUser on mount", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the user", () => {
    expect.assertions(2);
    component.instance().fetchUser()
      .then(() => {
        expect(component.state('user')).toEqual({"all_tweet_count": 0, "followers": 2, "following": 1, "id": 1, "name": "Ryan", "retweet_count": 0, "slug": "rg", "tweet_count": 0, "username": "RG"});
        expect(component.state('userLoaded')).toEqual(true);
      });
  });
});
