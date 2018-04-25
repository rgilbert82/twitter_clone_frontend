import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchField: '' };

    this.isInvalidForm = this.isInvalidForm.bind(this);
    this.updateSearchField = this.updateSearchField.bind(this);
    this.navigateToSearch = this.navigateToSearch.bind(this);
  }

  isInvalidForm() {
    return !this.state.searchField.length > 0;
  }

  updateSearchField(e) {
    this.setState({ searchField: e.target.value });
  }

  navigateToSearch() {
    this.props.redirectToSearch(this.state.searchField);
    this.setState({ searchField: '' });
  }

  render() {
    return (
      <div id="search_bar">
        <FormGroup>
          <FormControl id="search_field_input" type="text" onChange={this.updateSearchField} value={this.state.searchField} placeholder="Find by hashtag..."/>
          <Button onClick={this.navigateToSearch} disabled={this.isInvalidForm()}>Search</Button>
        </FormGroup>
      </div>
    );
  }
}
