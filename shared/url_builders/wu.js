export function getBase() {
  return `https://api.wunderground.com`
}

function getApiStart(apiKey) {
  return `/api/${apiKey}`
}
function getQueryLatLng(lat, lng) {
  return `/q/${lat},${lng}.json`
}

export function getApiFragment(scope, apiKey, lat, lng) {
  return getApiStart(apiKey) + '/' + scope + getQueryLatLng(lat, lng)
}

function getApiEndpoint(scope, apiKey, lat, lng) {
  return getBase() + getApiFragment(scope, apiKey, lat, lng)
}

export function getConditionsUrl(lat, lng, apiKey) {
  return getApiEndpoint('conditions', apiKey, lat, lng)
}

export function getH10Url(lat, lng, apiKey) {
  return getApiEndpoint('hourly10day', apiKey, lat, lng)
}

export function getF10Url(lat, lng, apiKey) {
  return getApiEndpoint('forecast10day', apiKey, lat, lng)
}