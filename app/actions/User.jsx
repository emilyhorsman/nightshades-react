import { fetchAPI } from './'

export function logout() {
  return {
    type: 'LOGOUT',
    promise: fetchAPI('/logout')
  }
}

export function fetchMe() {
  return {
    type: 'ME',
    promise: fetchAPI('/me')
  }
}
