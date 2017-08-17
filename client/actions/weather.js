import request from 'superagent'
import {
  RECEIVE_WEATHER
} from './index'

const getWeatherViaCity = (city, successCallback, errCallback) => {}

const receiveWeather = (weather) => {
  return {
    type: RECEIVE_WEATHER,
    weather
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
        if (err) {
          if (errCallback) errCallback(err)
          else throw err
        }
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
        if (err) {
          if (errCallback) errCallback(err)
          else throw err
        }
      })
  }
}