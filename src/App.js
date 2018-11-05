import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Distribution from './Distribution.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [
        {key: 0, name:'Example member 1'},
        {key: 1, name:'Example member 2'},
        {key: 2, name:'Example member 3'}
      ],
      exercises: ['A1', 'A2', 'A3']
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Assign </h1>
          <p>
            For distributing workload in study groups
          </p>
          
        </header>
        <div className="IO-box">
          <div className="Input">
            <Form 
              pushStateUp = {(exesList, members) => 
                this.setState({
                  exercises: exesList,
                  members: members
                })
              }
            />
          </div>
          <div className="Output">
            <Distribution 
              className = "Distribution"
              exercises = {this.state.exercises}
              members = {this.state.members}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
