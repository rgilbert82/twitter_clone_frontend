import React from 'react';
import { UserListItem } from '.';
import { getUsersAPI } from '../../services/api/users';

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersFeed: []
     };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.fetchUsers();
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    this._isMounted = false;
  }

  scrollListener() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      if (this.state.usersFeed.length < this.state.users.length) {
        this.setState({ usersFeed: this.state.users.slice(0, this.state.usersFeed.length + 15) });
      }
    }
  }

  fetchUsers() {
    return getUsersAPI()
      .then((data) => {
        this.setState({ users: data, usersFeed: data.slice(0, 15) });
      }).catch(() => {
        this.props.displayMessage('Oops! Something went wrong loading this page!');
      });
  }

  render() {
    let users = this.state.usersFeed.map((user) => {
      return (
        <li className="list_item" key={ user.id }>
          <UserListItem user={user} />
        </li>
      );
    });

    return (
      <div>
        <h1 className="section_header">Popular Users</h1>
        <ul>
          { users }
        </ul>
      </div>
    );
  }
}
