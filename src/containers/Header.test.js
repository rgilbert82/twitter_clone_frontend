import React from 'react';
import { Header } from '.';
import { shallow } from 'enzyme';

describe(Header, () => {
  let component;

  beforeEach(() => {
    component = shallow(<Header />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
