jest.mock('../../services/api/follows');

import React from 'react';
import { shallow } from 'enzyme';
import { UserFollowersList } from '.';
import { getUserFollowersAPI } from '../../services/api/follows';

describe(UserFollowersList, () => {
  let fetchSpy = jest.spyOn(UserFollowersList.prototype, 'fetchFollowers');
  let component;

  beforeEach(() => {
    component = shallow(<UserFollowersList user_id={1} loggedIn={true} />);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchFollowers on mount", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the followers", () => {
    expect.assertions(1);
    component.instance().fetchFollowers()
      .then(() => {
        expect(component.state('followers')).toEqual([{id: 1, name: 'Ryan', username: 'RG', slug: 'rg'}]);
      });
  });
});
