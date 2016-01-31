import React, { Component } from 'react'
import UserContainer from './UserContainer'
import TimerContainer from './TimerContainer'

export default class App extends Component {
  render() {
    return(
      <main>
        <UserContainer />
        <TimerContainer />
      </main>
    )
  }
}
