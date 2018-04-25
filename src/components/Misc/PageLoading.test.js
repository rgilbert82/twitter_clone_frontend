import React from 'react';
import { shallow } from 'enzyme';
import { PageLoading } from '.';

describe(PageLoading, () => {
  let component;

  beforeEach(() => {
    component = shallow(<PageLoading />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
