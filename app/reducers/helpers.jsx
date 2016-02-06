import Moment from 'moment'

export function isExpired({ expiry_time, expiry_threshold_seconds }) {
  const t = Moment(expiry_time)
  t.add(expiry_threshold_seconds, 'seconds')
  return Moment() > t
}
