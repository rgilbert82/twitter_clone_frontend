import React from 'react';
import { TweetListItem } from '.';
import { shallow } from 'enzyme';

describe(TweetListItem, () => {
  const tweetData = { id: 1, body: 'something here', user_id: 5, image: null };
  let component;

  beforeEach(() => {
    component = shallow(<TweetListItem tweet={tweetData}/>);
  });

  it("renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
