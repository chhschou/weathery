import request from 'superagent'

import adapter from 'adapters/wu'
import weathers from 'modules/weathers'

export function getUserLocationAndWeather(lat, lng) {
  return (dispatch, getState) => {
    const locationId = 0 // user location always at id 0
    return dispatch(weathers.actions.getCurrentConditions(lat, lng, locationId))
  }
}
