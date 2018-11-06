import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Distribution from './Distribution.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      exercises: []
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Assign </h1>
          <p>
            A tool for distributing work in study groups
          </p>
          
        </header>
        <div className="IO-box">
          <div className="Input">
            <h3> Input: </h3>
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
            <h3> Distribution: </h3>
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
