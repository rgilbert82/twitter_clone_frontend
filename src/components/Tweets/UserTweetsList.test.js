jest.mock('../../services/api/users');

import React from 'react';
import { UserTweetsList } from '.';
import { shallow } from 'enzyme';
import { getUserTweetsAPI } from '../../services/api/users';

describe(UserTweetsList, () => {
  const userID = 5;
  let fetchSpy = jest.spyOn(UserTweetsList.prototype, 'fetchTweets');
  let component;

  beforeEach(() => {
    component = shallow(<UserTweetsList user_id={userID} />);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchTweets on mount", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the tweets", () => {
    expect.assertions(2);
    component.instance().fetchTweets()
      .then(() => {
        expect(component.state('tweets')).toEqual([{ id: 1, body: 'something here', user_id: 5, image: null }]);
        expect(component.state('tweetsLoaded')).toEqual(true);
      });
  });
});
