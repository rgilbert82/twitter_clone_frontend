import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from '.';

describe(SearchBar, () => {
  let component;

  beforeEach(() => {
    component = shallow(<SearchBar />);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("updates the search field", () => {
    expect(component.state('searchField')).toEqual('');
    component.find('#search_field_input').simulate('change', { target: { value: 'hello' } });
    expect(component.state('searchField')).toEqual('hello');
  });

  it("checks if the form is valid", () => {
    expect(component.instance().isInvalidForm()).toEqual(true);
    component.find('#search_field_input').simulate('change', { target: { value: 'hello' } });
    expect(component.instance().isInvalidForm()).toEqual(false);
  });
});
