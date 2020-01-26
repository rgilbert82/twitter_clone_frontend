import React from 'react';
import { TweetListItem } from '../Tweets';
import { PageLoading } from '../Misc';
import { hashtagify } from '../../services/misc';
import { getSearchResultsAPI } from '../../services/api/search';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      resultsFeed: [],
      resultsLoaded: false
    };

    this.fetchResults = this.fetchResults.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchResults();
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const elements = document.getElementsByClassName('tweet_body_text');

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ results: [], resultsLoaded: false }, () => {
        this.fetchResults();
      });
    }

    for(let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = hashtagify(elements[i].innerHTML);
    }
  }

  scrollListener() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      if (this.state.resultsFeed.length < this.state.results.length) {
        this.setState({ resultsFeed: this.state.results.slice(0, this.state.resultsFeed.length + 8)});
      }
    }
  }

  fetchResults() {
    const searchField = this.props.match.params.search_field;
    let resultsData;

    return getSearchResultsAPI(searchField)
      .then((data) => {
        if (this._isMounted) {
          resultsData = data.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at); });
          this.setState({ results: resultsData, resultsFeed: resultsData.slice(0, 8), resultsLoaded: true });
        }
      }).catch((err) => {
        if (this._isMounted) {
          this.props.displayMessage('Oops! There was an error loading the search results.');
        }
      });
  }

  render() {
    let pluralize;
    let allTweets;
    let content;

    if (this.state.resultsLoaded && this.state.results.length === 0) {
      content = (
        <div id="section_message">
          <h2>Your search returned 0 results</h2>
        </div>
      );
    } else if(this.state.resultsLoaded) {
      allTweets = this.state.resultsFeed.map((tweet) => {
        return (
          <li className="list_item" key={tweet.id}>
            <TweetListItem history={this.props.history} navigateToSearch={this.props.navigateToSearch} tweet={tweet} loggedIn={this.props.loggedIn} displayMessage={this.props.displayMessage} />
          </li>
        );
      });

      if (this.state.results.length !== 1) {
        pluralize = "s";
      } else {
        pluralize = "";
      }

      content = (
        <div>
          <h3 className="search_results_header">"#{this.props.match.params.search_field}" returned {this.state.results.length} result{pluralize}</h3>
          <ul>
            {allTweets}
          </ul>
        </div>
      );
    } else {
      content = <PageLoading />;
    }

    return <div>{content}</div>;
  }
}
