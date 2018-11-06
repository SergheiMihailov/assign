import React, { Component } from 'react';
import './Distribution.css';

class Distribution extends Component {
  createDistribution(members, exes) {
    for (let member of members) {
      member.exercises = new Map()
    }

    for (let chapter of exes.entries()) {
      let exercises = []
      let from = chapter[1].slice()
      let initLen = parseInt(chapter[1].length)
 
      for (let i = 0; i < initLen; i++) {
        let randEx = Math.floor((from.length-1)*Math.random())
        
        
        exercises.push(parseInt(from[randEx]))
        console.log(parseInt(from[randEx]))
        from.splice(randEx, 1)  
      }

      for (let i = 0; i < members.length; i++) {
        members[i].exercises.set(
          chapter[0], exercises.slice(
            i*exercises.length/members.length,
            Math.floor((i+1)*exercises.length/members.length)
          ).sort((a, b) => a - b)
        )

      }
    }
  }

  render() {
    this.createDistribution(this.props.members, this.props.exercises)
    return (
      <div className="Distribution">
          <ul>
            {this.props.members.map(
                (member) => <li className="Member-el"> {member.name}: 
                <ul>
                  {Array.from(member.exercises.keys()).map(
                    (key) => 
                      <li>{key}:{" "}
                          {member.exercises.get(key).map(
                            (ex) => <span>{ex} </span>
                          )}
                      </li>
                  )}
                </ul>
              </li>
              )
            }
          </ul>
      </div>
    );
  }
}

export default Distribution;
