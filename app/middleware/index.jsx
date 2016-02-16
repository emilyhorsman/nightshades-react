import Moment from 'moment'

/*
 * This middleware makes some assumptions about the actions it ends up
 * procesing:
 *
 *   - A Promise object is given as a `promise` property of the action
 *   - This Promise came from the Fetch API (e.g. a `fetch()` call)
 *   - We're fetching something from a JSON API that follows spec
 */
const fetchJSONMiddleware = ({ dispatch }) => (next) => (action) => {  // eslint-disable-line no-unused-vars
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
      return payload.then(json => {
        if (json.hasOwnProperty('errors')) {
          return Promise.reject(json.errors[0].title)
        } else {
          return Promise.reject(res.statusText)
        }
      })
    })
    .then(payload => {
      const date = (payload.meta && payload.meta.date) ? Moment(payload.meta.date) : Moment()
      next({
        type: type + '_SUCCESS',
        data: payload.data,
        receivedAt: date,
        ...args
      })
    })
    .catch(e => {
      next({
        type: type + '_ERROR',
        message: e,
        receivedAt: Moment(),
        ...args
      })
    })
}

function transformData(action, func) {
  if (Array.isArray(action.data)) {
    return action.data.map(func.bind(null, action.receivedAt))
  }

  return func(action.receivedAt, action.data)
}

function transformUnitData(date, data) {
  if (data.type !== 'unit') {
    return data
  }

  const {
    description, completed, start_time, expiry_time,
    tags, expiry_threshold_seconds
  } = data.attributes

  const startTime  = Moment(start_time)
  const expiryTime = Moment(expiry_time)

  return {
    type: 'unit',
    uuid: data.id,
    model: {
      description: description,
      completed: completed,
      startTime: startTime,
      expiryTime: expiryTime,
      tags: tags || []
    },
    meta: {
      fetchedAtClient: Moment(),
      fetchedAt: date,
      delta: expiryTime.diff(date),
      expiryThreshold: expiry_threshold_seconds
    }
  }
}

const UnitMiddleware = ({ dispatch }) => (next) => (action) => {  // eslint-disable-line no-unused-vars
  if (!action.data) {
    return next(action)
  }

  if (!action.type.endsWith('_SUCCESS')) {
    return next(action)
  }

  next({
    ...action,
    data: transformData(action, transformUnitData)
  })
}

export { fetchJSONMiddleware, UnitMiddleware }
