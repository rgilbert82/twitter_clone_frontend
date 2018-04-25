import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { EnterSearch, SearchResults } from '.';

export default class SearchMain extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1 className="section_header">Hashtag Search Results</h1>
        </div>
        <div>
          <Switch>
            <Route exact path='/search' render={() => <EnterSearch />} />
            <Route exact path='/search/:search_field' render={(props) => <SearchResults {...props} loggedIn={this.props.loggedIn} currentUser={this.props.currentUser} displayMessage={this.props.displayMessage} navigateToSearch={this.props.navigateToSearch}/> } />
          </Switch>
        </div>
      </div>
    );
  }
}
