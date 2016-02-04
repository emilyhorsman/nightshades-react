export function api(endpoint) {
  return '//api.nightshades.xyz:5000/v1' + endpoint
}

export function fetchAPI(endpoint, opts) {
  return fetch(api(endpoint), {
    credentials: 'include',
    mode: 'cors',
    ...opts
  })
}
