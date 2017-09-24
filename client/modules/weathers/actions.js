import request from 'superagent'
import { REQUEST, RECEIVE, UPDATE } from 'modules/weathers/actionTypes'
import actions from 'actions'


export const requestWeather = (locationId) => {
  return { type: REQUEST, locationId }
}

export const receiveWeather = (locationId) => {
  return { type: RECEIVE, locationId }
}

export const updateWeather = (weather) => {
  return { type: UPDATE, weather }
}

export const getWeatherViaLocationId = (locationId) => {
  return (dispatch, getState) => {
    const state = getState()
    console.log(state)
    const { weathers, locations } = getState()
    const weatherAtLocation = weathers.items[locationId]
    if (weatherAtLocation) {
      // check it isn't stale
      // assume not for now
    } else {
      const location = locations[locationId]
      if (location) {
        const { lat, lng } = location.coords
        dispatch(requestWeather(locationId))
        dispatch(getWeather(lat, lng))
      }
    }
  }
}

export const getWeather = (lat, lng) => {
  return (dispatch) => {
    console.log('lat,lng', lat, lng)
    return request.get('api/v1/weathers/' + lat, lng)
      .then((res) => {
        dispatch(receiveWeather(res.body))
      })
      .catch((err) => {
        dispatch(setError(err))
      })
  }
}