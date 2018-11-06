import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [], 
      newMember: '',
      exesInput: "A.1 - A.17, A.19 - A.34, 9.1 - 9.3, 9.9 - 9.16",
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
        <ul><li>Book A: <ul>
          A.1 - A.17, A.19 - A.34,
          9.1 - 9.3,9.9 - 9.16,9.21 - 9.25,9.31 - 9.33,
          5.1-5.40,
          7.1 - 7.12,
          8.1 - 8.17,
          12.1 - 12.8,
          6.1 - 6.18
          </ul>
          </li>
          <li>Book C (Patterson): <ul>
          B.2, B.3, B.4, B.5, B.6, B10,B.11, B.15,B.37, B.38,B.39, 3.1 - 3.10,3.17, 3.20,3.23, 3.24,3.27,3.29, 3.30,3.41, 3.42,3.43, 3.44,4.1, 4.2, 4.3,4.4, 4.6, 4.7, 5.1 - 5.7, 5.13, 5.17, 6.1 - 6.8, 6.15,6.16, 6.19,6.20, 4.8 - 4.18
          </ul>
          </li>
          </ul>

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
