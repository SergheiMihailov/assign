import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {members: [{key: 0, name:'Example member'}], newMember: ''}
  }

  addMember() {
    this.setState(
      prevState => (
        {
          members: [
            ...prevState.members, 
            {key: prevState.members.length, name: prevState.newMember}
          ],
          newMember: ''
        }
      )
    )
    this.props.pushMembersUp(this.state.members)
  }

  removeMember(key) {
    if (this.state.members.length > 1) {
      return () => {this.setState(
          prevState => (
            {
              members: [
                ...prevState.members.slice(0, key), 
                ...prevState.members.slice(key+1)
              ]
            }
          )
        )
        this.props.pushMembersUp(this.state.members)
      }
    } else {
      return () => {
        this.setState({members: []})
        this.props.pushMembersUp(this.state.members)
      }
    }
  }

  render() {
    return (
      <div className="Form">
        <ul className="Member-list">
          {this.state.members.map( 
              (member) => 
                <li className="Member-el"> 
                  {member.name} 
                  <button 
                    className="Remove-member" 
                    onClick = {this.removeMember(member.key).bind(this)}
                  > 
                    - 
                  </button>
                </li>
            )
          }
        </ul>
        <input 
          className="Input-member" 
          title="New member name"
          value={this.state.newMember}
          onChange={
            (event) => this.setState({newMember:event.target.value})
          }
        />
        <button className="Add-member" onClick = {this.addMember.bind(this)}> + </button>
      </div>
    );
  }
}

export default Form;
