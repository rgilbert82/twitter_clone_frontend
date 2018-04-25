import React from 'react';
import { shallow } from 'enzyme';
import { EditComment } from '.';

describe(EditComment, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  const editMock = jest.fn();
  const deleteMock = jest.fn();
  const commentBody = 'Hello World';
  let component;

  beforeEach(() => {
    component = shallow(<EditComment body={commentBody} editCommentBody={editMock} deleteComment={deleteMock} displayMessage={jest.fn()} currentUser={currentUser}/>);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("toggles the form", () => {
    expect(component.state('editable')).toEqual(false);
    component.find('.formToggle').simulate('click');
    expect(component.state('editable')).toEqual(true);
    component.find('.formToggle').simulate('click');
    expect(component.state('editable')).toEqual(false);
  });

  it("edits the body", () => {
    expect(component.state('editBody')).toEqual(commentBody);
    component.find('.formToggle').simulate('click');
    component.find('#form_body').simulate('change', { target: { value: 'Hi' }});
    expect(component.state('editBody')).toEqual('Hi');
  });

  it("submits the form", () => {
    component.find('.formToggle').simulate('click');
    component.find('#form_body').simulate('change', { target: { value: 'Hi' }});
    component.find('#submitForm').simulate('click');
    expect(editMock).toHaveBeenCalled();
  });
});
