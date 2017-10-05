import request from 'superagent'

import locations from 'modules/locations'
import { REQUEST, RECEIVE, UPDATE } from 'modules/weathers/actionTypes'
import actions from 'actions'
import { getConditionsUrl, getH10Url, getF10Url } from 'url_builders/wu'
import adapter from 'adapters/wu'

export const requestWeather = (locationId) => {
  return { type: REQUEST, locationId }
}

export const receiveWeather = (locationId, weather) => {
  return { type: RECEIVE, locationId, weather }
}

export const updateWeather = (weather) => {
  return { type: UPDATE, weather }
}

export function getCurrentConditions(lat, lng, locationId) {
  return (dispatch, getState) => {
    const { settings } = getState()
    dispatch(requestWeather(locationId))
    const url = getConditionsUrl(lat, lng, settings.weatherApiKey)
    return request.get(url)
      .then((result) => {
        // update location via data obtain from current conditions
        updateLocation(locationId, result.body, dispatch)
        const weather = {
          currentConditions: adapter.getConditions(result.body)
        }
        dispatch(receiveWeather(locationId, weather))
      })
  }
}

function updateLocation(locationId, rawResponse, dispatch) {
  dispatch(locations.actions.requestLocation())
  const location = {
    id: locationId,
    ...(adapter.getLocation(rawResponse))
  }
  dispatch(locations.actions.receiveLocation(location))
}

export function getForecastViaLocationId(locationId) {
  return (dispatch, getState) => {
    const { weathers, locations } = getState()
    const weatherAtLocation = weathers.items[locationId]
    if (weatherAtLocation) {
      // todo check it isn't stale, call api if required
      return new Promise((resolve, reject) => {}) 
    } else {
      dispatch(requestWeather(locationId))
      return dispatch(getForecast(locationId))
    }
  }
}

const getForecast = (locationId) => {
  return (dispatch, getState) => {
    const { settings, locations } = getState()
    const location = locations.items[locationId]
    const { lat, lng } = location.coords
    const requests = [
      request.get(getH10Url(lat, lng, settings.weatherApiKey)),
      request.get(getF10Url(lat, lng, settings.weatherApiKey)),
    ]
    return Promise.all(requests)
      .then((results) => {
        const weather = {
          h10: adapter.getForecastHours(results[0].body),
          f10: adapter.getForecastDays(results[1].body)
        }
        dispatch(receiveWeather(location.id, weather))
      })
  }
}