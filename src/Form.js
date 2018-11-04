import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {members: [{key: 0, name:'Example member'}], newMember: ''}
  }

  onSubmit() {
    this.props.pushMembersUp(this.state.members)
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
      }
    } else {
      return () => {
        this.setState({members: []})
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
        <button className="Submit" onClick = {this.onSubmit.bind(this)}> Submit </button>
      </div>
    );
  }
}

export default Form;
