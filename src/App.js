import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {members: []}
  }
  render() {
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
            <h3> Team members: </h3>
            <Form 
              pushMembersUp = {(x) => 
                this.setState({members: x})
              }
            />
          </div>
          <div className="Output">
            <h3> Distribution: </h3>
            {this.state.members.map((member)=> <div>{member.name}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
