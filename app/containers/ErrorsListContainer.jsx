import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dismissError } from '../actions'
import Error from '../components/Error'

class ErrorsListContainer extends Component {
  constructor(props) {
    super(props)

    this.onHandleDismiss = (id) => this.handleDismiss.bind(this, id)
  }

  handleDismiss(id) {
    dismissError(this.props.dispatch, id)
  }

  render() {
    return (
      <ul>
        {this.props.errors.map(error =>
          <Error
            handleDismiss={this.onHandleDismiss(error.id)}
            key={error.id}
            message={error.message}
          />
        )}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors
  }
}

export default connect(
  mapStateToProps
)(ErrorsListContainer)
