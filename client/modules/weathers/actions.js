import request from 'superagent'
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

export const getWeatherViaLocationId = (locationId) => {
  return (dispatch, getState) => {
    const { weathers, locations } = getState()
    const weatherAtLocation = weathers.items[locationId]
    if (weatherAtLocation) {
      // check it isn't stale
      // assume not for now
    } else {
      const location = locations.items[locationId]
      if (location) {
        dispatch(requestWeather(location.id))
        return dispatch(getWeather(location.id))
      }
    }
  }
}

const getWeather = (locationId) => {
  return (dispatch, getState) => {
    const { settings, locations } = getState()
    const location = locations.items[locationId]
    const { lat, lng } = location.coords
    const requests = [
      request.get(getConditionsUrl(lat, lng, settings.weatherApiKey)), 
      request.get(getH10Url(lat, lng, settings.weatherApiKey)),
      request.get(getF10Url(lat, lng, settings.weatherApiKey)),
    ]
    return Promise.all(requests)
      .then((results) => {
        const weather = {
          currentConditions: adapter.getConditions(results[0].body),
          h10: adapter.getForecastHours(results[1].body),
          f10: adapter.getForecastDays(results[2].body)
        }
        return dispatch(receiveWeather(location.id, weather))
      })
  }
}