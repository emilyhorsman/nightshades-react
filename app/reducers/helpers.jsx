import Moment from 'moment'

export function isOngoing({ meta, model }) {
  if (model.completed) {
    return false
  }

  const t = model.expiryTime.clone()
  t.add(meta.expiryThreshold, 'seconds')
  return Moment() < t
}
