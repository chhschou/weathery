import request from 'superagent'
import { REQUEST, RECEIVE, UPDATE } from 'modules/weathers/actionTypes'
import actions from 'actions'
import { getConditionsUrl, getH10Url, getF10Url } from 'url_builders/wu'

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

const getWeather = (locationId, lat, lng) => {
  return (dispatch, getState) => {
    const { settings, locations } = getState()
    const location = locations.items[locationId]
    const { lat, lng } = location.coords
    const requestUrl = getConditionsUrl(lat, lng, settings.weatherApiKey)
    return request.get(requestUrl)
      .then((res) => {
        dispatch(receiveWeather(location.id, res.body))
      })
      .catch((err) => {
        dispatch(actions.error.setError(err))
      })
  }
}