import React, { Component } from 'react';
import UserRow from './userRow';
import user from './userRow';

class MyUsers extends Component<user> {
  state = {
    users: [
      { id: 1, name: 'Jessie', summary: '26' },
      { id: 2, name: 'Tyler', summary: '28' }
    ]
  };

  async componentDidMount() {
    const result = await fetch(
      'https://lhmsapi.homeserver.dtwilliams10.com/api/users'
    );
    const users = await result.json();
    this.setState({ users });
  }

  render() {
    return (
      <div>
        <h1>My Users</h1>
        <div>
          <table className="user-list">
            <tbody>
              {this.state.users.map(user => (
                <UserRow id={user.id} name={user.name} summary={user.summary} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyUsers;
