jest.mock('../../services/api/users');

import React from 'react';
import { AllUsers } from '.';
import { shallow } from 'enzyme';
import { getUsersAPI } from '../../services/api/users';

describe(AllUsers, () => {
  let component;
  let fetchSpy = jest.spyOn(AllUsers.prototype, 'fetchUsers');

  beforeEach(() => {
    component = shallow(<AllUsers />);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("calls fetchUsers on load", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the users", () => {
    expect.assertions(1);
    return component.instance().fetchUsers()
      .then(() => {
        component.update();
        expect(component.state('users')).toEqual([{"followers": 1, "following": 1, "id": 1, "name": "Ryan", "slug": "rg", "username": "RG"}]);
      });
  });
});
