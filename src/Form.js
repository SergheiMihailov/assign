import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [], 
      newMember: '',
      exesInput: "",
      exesList: []
    }
  }

  parseExercises(exString) {  
    let result = new Map()
    // A.1 - A.17,
    exString = exString.split(' ').join('')
    console.log(exString)
    exString = exString.split(',')
    for (let entry of exString){
      if (entry.length > 1) {
        entry = entry.split('-')
        console.log(entry)
        let chapter = entry[0].split('.')[0]
        let firstEx = parseInt(entry[0].split('.')[1])
        let lastEx = firstEx
        if (entry.length > 1) {
          lastEx = parseInt(entry[1].split('.')[1])
        }
        let range = Array.from(Array(lastEx-firstEx+1).keys()).map((i) => i+firstEx)
        if (result.has(chapter)) {
          result.set(chapter, [...result.get(chapter), ...range])
        } else {
          result.set(chapter, [...range])
        }
      }
    }
       
    return result
  }

  onSubmit(event) {
    event.preventDefault()
    this.setState({exesList: this.parseExercises(this.state.exesInput)})
    this.props.pushStateUp(
      this.state.exesList,
      this.state.members
    )
  }

  addMember(event) {
    event.preventDefault()
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
        <p> Team members: </p>
        <form onSubmit = {this.addMember.bind(this)}>
          <input 
            placeholder="New member name"
            value={this.state.newMember}
            onChange={
              (event) => this.setState({newMember:event.target.value})
            }
          />
          <button 
            type="submit" 
            className="Add-member" 
          > + </button>
        </form>
        <ul className="Member-list">
          {this.state.members.map( 
              (member) => 
                <li className="Member-el" key={member.key}> 
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
        <p> Exercises: </p>
        <p> (Input format: chapter.first ex.-chapter.last ex, ... ) </p>
        <p> Exercises for SysArch 2018 students:</p>
        <p>
          A.1 - A.17, A.19 - A.34,
          9.1 - 9.3,9.9 - 9.16,9.21 - 9.25,9.31 - 9.33,
          5.1-5.40,
          7.1 - 7.12,
          8.1 – 8.17,
          12.1 – 12.8,
          6.1 – 6.18</p>
        <form onSubmit = {this.onSubmit.bind(this)}>
          <input
            placeholder="A.1 - A.17, "
            value={this.state.exesInput}
            onChange={
              (event) => this.setState({exesInput:event.target.value})
            }
          />
        
          <button type= "submit" className="Submit" onClick = {this.onSubmit.bind(this)}> 
            Distribute exercises
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
