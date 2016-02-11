import React, { Component } from 'react'
import ErrorsListContainer from './ErrorsListContainer'
import UserContainer from './UserContainer'

import '../assets/styles.scss'

export default class App extends Component {
  render() {
    return(
      <div>
        <ErrorsListContainer />
        <UserContainer />
      </div>
    )
  }
}
