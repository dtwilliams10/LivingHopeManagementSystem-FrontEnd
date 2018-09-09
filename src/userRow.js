import React, { Component } from 'react';
class UserRow extends Component {
  render() {
    return (
      <tr>
        <td className="avatar">Avatar</td>
        <td className="name">{this.props.user.name}</td>
        <td className="summary">{this.props.user.summary}</td>
        <td className="actions">Buttons here</td>
      </tr>
    );
  }
}
export default UserRow;
