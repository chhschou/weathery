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

export const getWeather = (locationId) => {
  return (dispatch) => {
    dispatch(requestWeather(locationId))
    return request.get('api/v1/weathers/' + locationId)
      .then((res) => {
        dispatch(receiveWeather(res.body))
      })
      .catch((err) => {
        dispatch(setError(err))
      })
  }
}