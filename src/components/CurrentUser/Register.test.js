import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '.';

describe(Register, () => {
  const createMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<Register loggedIn={false} createUser={createMock} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("updates name", () => {
    expect(component.state('name')).toEqual('');
    component.find('#userNameForm').simulate('change', { target: { value: 'Ryan'}});
    expect(component.state('name')).toEqual('Ryan');
  });

  it("updates username", () => {
    expect(component.state('username')).toEqual('');
    component.find('#userUsernameForm').simulate('change', { target: { value: 'Ryan'}});
    expect(component.state('username')).toEqual('Ryan');
  });

  it("updates password", () => {
    expect(component.state('password')).toEqual('');
    component.find('#userPasswordForm').simulate('change', { target: { value: 'password'}});
    expect(component.state('password')).toEqual('password');
  });

  it("is a valid form", () => {
    expect(component.instance().isValidForm()).toEqual(false);
    component.find('#userNameForm').simulate('change', { target: { value: 'Ryan'}});
    component.find('#userUsernameForm').simulate('change', { target: { value: 'Ryan'}});
    component.find('#userPasswordForm').simulate('change', { target: { value: 'password'}});
    expect(component.instance().isValidForm()).toEqual(true);
  });

  it("submits the form", () => {
    component.find('#userNameForm').simulate('change', { target: { value: 'Ryan'}});
    component.find('#userUsernameForm').simulate('change', { target: { value: 'Ryan'}});
    component.find('#userPasswordForm').simulate('change', { target: { value: 'password'}});
    component.find('#submit_form').simulate('click');
    expect(createMock).toBeCalled();
  });
});
