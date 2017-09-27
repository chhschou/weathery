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

export function getConditionsUrl(lat, lng, apiKey) {
  return getBase() + getApiFragment('conditions', apiKey, lat, lng)
}

export function getH10Url(lat, lng, apiKey) {
  return getBase(apiKey) + '/hourly10day' + getQueryLatLng(lat, lng)
}

export function getF10Url(lat, lng, apiKey) {
  return getBase(apiKey) + '/forecast10day' + getQueryLatLng(lat, lng)
}