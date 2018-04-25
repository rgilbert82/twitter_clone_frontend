import React from 'react';
import { UserHeaderInfo } from '.';
import { shallow } from 'enzyme';

describe(UserHeaderInfo, () => {
  const currentUserData = { id: 1, name: 'Ryan', username: 'RG' };
  let component;

  beforeEach(() => {
    component = shallow(<UserHeaderInfo appLogout={jest.fn()} currentUser={ currentUserData }/>)
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });
});
