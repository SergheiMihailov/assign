import React, { Component } from 'react';
import './Distribution.css';

class Distribution extends Component {
  createDistribution(members, exes) {
    for (let i = 0; i < members.length; i++) {
      members[i].exercises = '';
    }

    let initialLen = exes.length

    for (let i = 0; i < initialLen; i++) {
      let nextExerciseId = Math.trunc(Math.random()*exes.length)
      console.log(members)
      let memberId = i % members.length
      members[memberId].exercises += ', '+(exes[nextExerciseId])
      exes.splice(nextExerciseId, 1)
    }
  }

  render() {
    this.createDistribution(this.props.members, this.props.exercises)
    return (
      <div className="Distribution">
        {this.props.members.map(
            (member) => <div> {member.name} {member.exercises}</div>
          )
        }
      </div>
    );
  }
}

export default Distribution;
