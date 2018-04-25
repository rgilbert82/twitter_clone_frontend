import React from 'react';
import { Main } from '.';
import { shallow } from 'enzyme';

describe(Main, () => {
  let component;

  beforeEach(() => {
    component = shallow(<Main />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
