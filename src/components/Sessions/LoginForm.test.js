jest.mock('../../services/api/sessions');

import React from 'react';
import { LoginForm } from '.';
import { shallow } from 'enzyme';
import { loginAPI } from '../../services/api/sessions';

describe(LoginForm, () => {
  let appLoginMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<LoginForm appLogin={appLoginMock} />);
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  it('updates username on input', () => {
    expect(component.state('username')).toEqual('');
    component.find('#username_field').simulate('change', { target: { value: 'User123' } });
    expect(component.state('username')).toEqual('User123');
  });

  it('updates password on input', () => {
    expect(component.state('password')).toEqual('');
    component.find('#password_field').simulate('change', { target: { value: 'password' } });
    expect(component.state('password')).toEqual('password');
  });

  it('logs in the user', () => {
    expect.assertions(3);
    component.setState({ username: 'RG', password: 'password' });
    return component.instance().submitForm()
      .then(() => {
        expect(component.state('username')).toEqual('');
        expect(component.state('password')).toEqual('');
        expect(appLoginMock).toBeCalled();
      });
  });
});
