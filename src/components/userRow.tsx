import React, { Component } from 'react';

export interface UserProps {
  id: number;
  name: string;
  summary: string;
}

class UserRow extends Component<UserProps> {
  render() {
    return (
      <tr>
        <td className="avatar">Avatar</td>
        <td className="id">{this.props.id}</td>
        <td className="name">{this.props.name}</td>
        <td className="summary">{this.props.summary}</td>
        <td className="actions">
          <button>Button</button>
        </td>
      </tr>
    );
  }
}

export default UserRow;
