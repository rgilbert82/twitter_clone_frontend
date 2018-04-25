jest.mock('../../services/api/follows');

import React from 'react';
import { shallow } from 'enzyme';
import { UserFollowingsList } from '.';
import { getUserFollowingsAPI } from '../../services/api/follows';

describe(UserFollowingsList, () => {
  let fetchSpy = jest.spyOn(UserFollowingsList.prototype, 'fetchFollowings');
  let component;

  beforeEach(() => {
    component = shallow(<UserFollowingsList user_id={1} loggedIn={true} />);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchFollowings on mount", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the followers", () => {
    expect.assertions(1);
    component.instance().fetchFollowings()
      .then(() => {
        expect(component.state('followings')).toEqual([{id: 1, name: 'Ryan', username: 'RG', slug: 'rg'}]);
      });
  });
});
