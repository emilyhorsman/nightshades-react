const promiseMiddleware = store => next => action {
  if (!action.promise) {
    return next(action)
  }
}

export default promiseMiddleware
