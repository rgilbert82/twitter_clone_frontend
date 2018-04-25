import React from 'react';
import { UserProfileHeader } from '.';
import { shallow } from 'enzyme';

describe(UserProfileHeader, () => {
  let component;

  beforeEach(() => {
    component = shallow(<UserProfileHeader user={{name: 'Ryan', username: 'RG', followers: 2, following: 1}} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
