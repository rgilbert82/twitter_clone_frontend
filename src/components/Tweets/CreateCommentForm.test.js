import React from 'react';
import { shallow } from 'enzyme';
import { CreateCommentForm } from '.';

describe(CreateCommentForm, () => {
  const createMock = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(<CreateCommentForm createNewComment={createMock} />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("updates the body", () => {
    expect(component.state('body')).toEqual('');
    component.find('#form_body').simulate('change', { target: { value: 'Hello World' }});
    expect(component.state('body')).toEqual('Hello World');
  });

  it("is a valid form", () => {
    expect(component.instance().validForm()).toEqual(false);
    component.find('#form_body').simulate('change', { target: { value: 'Hello World' }});
    expect(component.instance().validForm()).toEqual(true);
  });

  it("submits the form", () => {
    component.find('#form_body').simulate('change', { target: { value: 'Hello World' }});
    component.find('#submit_comment_form').simulate('click');
    expect(createMock).toBeCalled();
  });
});
