import React from 'react';
import { shallow } from 'enzyme';
import { EditUserForm } from '.';

describe(EditUserForm, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '123', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  const editMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<EditUserForm currentUser={currentUser} editUser={editMock} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("updates name", () => {
    expect(component.state('newName')).toEqual('Ryan');
    component.find('#userNameForm').simulate('change', { target: { value: 'Bob'} } );
    expect(component.state('newName')).toEqual('Bob');
  });

  it("updates username", () => {
    expect(component.state('newUsername')).toEqual('RG');
    component.find('#userUsernameForm').simulate('change', { target: { value: 'Bob'} } );
    expect(component.state('newUsername')).toEqual('Bob');
  });

  it("updates password", () => {
    expect(component.state('newPassword')).toEqual('');
    component.find('#userPasswordForm').simulate('change', { target: { value: 'password'} } );
    expect(component.state('newPassword')).toEqual('password');
  });

  it("submits the form", () => {
    component.find('#submit_form').simulate('click');
    expect(editMock).toBeCalled();
  });
});
