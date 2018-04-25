import React from 'react';
import { shallow } from 'enzyme';
import { MessageWindow } from '.';

describe(MessageWindow, () => {
  let component;

  beforeEach(() => {
    component = <MessageWindow message='Error Message' closeMessage={jest.fn()} />;
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
