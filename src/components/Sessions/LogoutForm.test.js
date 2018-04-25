jest.mock('../../services/api/sessions');

import React from 'react';
import { LogoutForm } from '.';
import { shallow } from 'enzyme';
import { logoutAPI } from '../../services/api/sessions';

describe(LogoutForm, () => {
  let appLogoutMock = jest.fn();
  let logoutSpy = jest.spyOn(LogoutForm.prototype, 'logout');
  let component;

  beforeEach(() => {
    component = shallow(<LogoutForm appLogout={appLogoutMock} />);
  });

  afterAll(() => {
    logoutSpy.mockClear();
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  it('calls logout on button click', () => {
    component.find('#submit_logout_form').simulate('click');
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('logs out the user', () => {
    expect.assertions(1);
    component.instance().logout()
      .then(() => {
        expect(appLogoutMock).toBeCalled();
      });
  });
});
