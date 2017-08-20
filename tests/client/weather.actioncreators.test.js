import test from 'ava'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

import './setup-client-env'
import * as types from '../../client/actions'
import * as actions from '../../client/actions/weather.js'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

const getWeatherData = () => ({
  "coord": {
    "lon": -0.13,
    "lat": 51.51
  },
  "weather": [{
    "id": 800,
    "main": "Clear",
    "description": "clear sky",
    "icon": "01n"
  }],
  "base": "stations",
  "main": {
    "temp": 286.53,
    "pressure": 1020,
    "humidity": 71,
    "temp_min": 284.15,
    "temp_max": 289.15
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.6,
    "deg": 290
  },
  "clouds": {
    "all": 0
  },
  "dt": 1502839200,
  "sys": {
    "type": 1,
    "id": 5093,
    "message": 0.0265,
    "country": "GB",
    "sunrise": 1502858864,
    "sunset": 1502911241
  },
  "id": 2643743,
  "name": "London",
  "cod": 200
})

test('setWeatherViaCity action creator works', t => {
  nock('http://api.openweathermap.org')
    .get('/data/2.5/weather')
    .query({
      q: 'London',
      APPID: process.env.OPENWEATHERMAP_APIKEY
    })
    .reply(200, getWeatherData())

  const expectedActionCreators = [
    {type: types.RECEIVE_WEATHER, weather: getWeatherData()}]

  const store = mockStore({
    current: {},
    weather: {}
  })

  return store.dispatch(actions.setWeatherViaCity('London'))
  .then(() => {
    t.deepEqual(store.getActions(), expectedActionCreators, 'when successfully fetched the latest weather')
  })
})

test('setWeatherViaLatLon action creator works', t => {
  nock('http://api.openweathermap.org')
    .get('/data/2.5/weather')
    .query({
      lat: 51.51,
      lon: -0.13,
      APPID: process.env.OPENWEATHERMAP_APIKEY
    })
    .reply(200, getWeatherData())
    
  const expectedActionCreators = [
    {type: types.RECEIVE_WEATHER, weather: getWeatherData()}]

  const store = mockStore({
    current: {},
    weather: {}
  })

  return store.dispatch(actions.setWeatherViaLatLon(51.51, -0.13))
  .then(() => {
    t.deepEqual(store.getActions(), expectedActionCreators, 'when successfully fetched the latest weather')
  })
})