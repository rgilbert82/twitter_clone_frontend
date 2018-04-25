import React from 'react';
import { shallow } from 'enzyme';
import { DarkLayer } from '.';

describe(DarkLayer, () => {
  let component;

  beforeEach(() => {
    component = <DarkLayer />;
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
