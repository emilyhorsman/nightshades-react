/*
 * This middleware makes some assumptions about the actions it ends up
 * procesing:
 *
 *   - A Promise object is given as a `promise` property of the action
 *   - This Promise came from the Fetch API (e.g. a `fetch()` call)
 *   - We're fetching something from a JSON API that follows spec
 */
const fetchJSONMiddleware = ({ dispatch }) => (next) => (action) => {
  // No Promise? </3 Move along…
  if (!action.promise) {
    return next(action)
  }

  const { type, promise, ...args } = action

  // We still want to give the next middleware's dispatcher this action
  next({
    type: type + '_FETCHING',
    ...args
  })


  return promise
    .then(res => ({ res: res, payload: res.json() }))
    .then(({ res, payload }) => {
      if (res.status >= 200 && res.status < 300) {
        return payload
      }

      // Prefer error messages following the JSON API spec.
      if (payload.hasOwnProperty('errors')) {
        return Promise.reject(payload.errors[0].title)
      } else {
        return Promise.reject(res.statusText)
      }
    })
    .then(payload => {
      dispatch({
        type: type + '_SUCCESS',
        data: payload.data,
        receivedAt: Date.now(),
        ...args
      })
    })
    .catch(e => {
      dispatch({
        type: type + '_ERROR',
        message: e,
        receivedAt: Date.now(),
        ...args
      })
    })
}

export { fetchJSONMiddleware }
