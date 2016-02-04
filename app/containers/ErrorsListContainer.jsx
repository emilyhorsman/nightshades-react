import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/Errors'
import Error from '../components/Error'

class ErrorsListContainer extends Component {
  constructor(props) {
    super(props)

    this.onDismiss = (id) => props.actions.dismissError.bind(this, id)
  }

  render() {
    const { errors } = this.props
    return (
      <ul>
        {errors.map(error =>
          <Error
            key={error.id}
            message={error.message}
            onDismiss={this.onDismiss(error.id)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorsListContainer)
