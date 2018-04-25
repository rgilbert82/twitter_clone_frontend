import React from 'react';
import { UserListItem } from '.';
import { shallow } from 'enzyme';

describe(UserListItem, () => {
  const userData = { id: 1, name: 'Ryan', username: 'RG', slug: 'rg', token: '12345' };
  let component;

  beforeEach(() => {
    component = shallow(<UserListItem user={userData} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
