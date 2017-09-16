import request from 'superagent'
import { REQUEST, RECEIVE, UPDATE } from './actionTypes'


export const requestWeathers = (locationId) => {
  return { type: REQUEST, locationId }
}

export const receiveWeathers = (weathers) => {
  return { type: RECEIVE, weathers }
}

export const updateWeather = (weather) => {
  return { type: UPDATE, weather }
}

export const addWeather = (locationId) => {
  return {
    type: ADD,
    weather: { isFetching: true }
  }
}

export const setWeatherViaLatLon = (lat, lon, errCallback) => {
  return (dispatch) => {
    return request.get('http://api.openweathermap.org/data/2.5/weather')
      .query({
        lat: lat,
        lon: lon,
        APPID: process.env.OPENWEATHERMAP_APIKEY
      })
      .then((res) => {
        dispatch(receiveWeather(res.body))
      })
      .catch((err) => {
        if (errCallback) errCallback(err)
        else throw err
      })
  }
}

export const setWeatherViaCity = (city, errCallback) => {
  return (dispatch) => {
    return request.get('http://api.openweathermap.org/data/2.5/weather')
      .query({
        q: city,
        APPID: process.env.OPENWEATHERMAP_APIKEY
      })
      .then((res) => {
        dispatch(receiveWeather(res.body))
      })
      .catch((err) => {
        if (errCallback) errCallback(err)
        else throw err
      })
  }
}