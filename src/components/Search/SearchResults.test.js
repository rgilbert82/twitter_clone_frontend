jest.mock('../../services/api/search');

import React from 'react';
import { shallow } from 'enzyme';
import { SearchResults } from '.';
import { getSearchResultsAPI } from '../../services/api/search';

describe(SearchResults, () => {
  const currentUser = { id: 1, name: 'Ryan', username: 'RG', token: '12345', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1, all_tweet_count: 2 };
  let fetchSpy = jest.spyOn(SearchResults.prototype, 'fetchResults');
  let component;

  beforeEach(() => {
    component = shallow(<SearchResults match={{params: { search_field: 'sports'}}} loggedIn={true} currentUser={currentUser} displayMessage={jest.fn()} />);
  });

  afterAll(() => {
    fetchSpy.mockClear();
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });

  it("triggers fetchResults on mount", () => {
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("fetches the tweets", () => {
    expect.assertions(2);
    component.instance().fetchResults()
      .then(() => {
        expect(component.state('results')).toEqual([{ id: 1, body: 'something here', user_id: 5, image: null }]);
        expect(component.state('resultsLoaded')).toEqual(true);
      });
  });
});
