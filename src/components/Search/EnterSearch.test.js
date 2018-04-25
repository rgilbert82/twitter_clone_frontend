import React from 'react';
import { EnterSearch } from '.';

describe(EnterSearch, () => {
  let component;

  beforeEach(() => {
    component = <EnterSearch />;
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
