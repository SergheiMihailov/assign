import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [
        {key: 0, name:'Example member 1'},
        {key: 1, name:'Example member 2'},
        {key: 2, name:'Example member 3'}
      ], 
      newMember: '',
      exesInput: "[A, 1, 3]; [A, 5, 10] ",
      exesList: []
    }
  }

  parseExercises(exString) {  
    let result = []

    let exList = exString.split(';')
        for (let i in exList) {
          exList[i] = exList[i].split(',')
          for (let j in exList[i]) {
            exList[i][j] = exList[i][j].replace('[', '')
            exList[i][j] = exList[i][j].replace(']', '')
            exList[i][j] = exList[i][j].replace(' ', '')
          }
        }
    for (let j = 0; j < exList.length; j++) {
      let chunk = []
      for (let i = parseInt(exList[j][1]); i <= parseInt(exList[j][2]); i++) {
        chunk.push(exList[j][0]+i);
      }
      result = [...result, ...chunk]
    }

    return result
  }

  onSubmit() {
    this.setState({exesList: this.parseExercises(this.state.exesInput)})
    this.props.pushStateUp(
      this.state.exesList,
      this.state.members
    )
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
        <button className="Submit" onClick = {this.onSubmit.bind(this)}> 
          Distribute exercises
        </button>
        <p> Exercises: </p>
        <p> (Input format: [chapter, first ex. last ex.]; [next chapter, ...] ... ) </p>
        <input
          value={this.state.exesInput}
          onChange={
            (event) => this.setState({exesInput:event.target.value})
          }
        />
        <p> Team members: </p>
        <input 
          placeholder="New member name"
          value={this.state.newMember}
          onChange={
            (event) => this.setState({newMember:event.target.value})
          }
        />
        <button className="Add-member" onClick = {this.addMember.bind(this)}> + </button>
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
      </div>
    );
  }
}

export default Form;
