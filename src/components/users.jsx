import React, { Component } from 'react';
import UserRow from './userRow.jsx';
class MyUsers extends Component {
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
                <UserRow key={user.id} user={user} className="user" />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyUsers;
