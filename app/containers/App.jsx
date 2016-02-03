import React, { Component } from 'react'
import ErrorsListContainer from './ErrorsListContainer'
import UserContainer from './UserContainer'

export default class App extends Component {
  render() {
    return(
      <main>
        <ErrorsListContainer />
        <UserContainer />
      </main>
    )
  }
}
