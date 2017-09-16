import test from 'ava'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

import './setup-client-env'
import * as data from './data'
import { actions, constants } from '../../client/modules/weathers'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

test.skip('setWeatherViaCity action creator works', t => {
  nock('http://api.openweathermap.org')
    .get('/data/2.5/weather')
    .query({
      q: 'London',
      APPID: process.env.OPENWEATHERMAP_APIKEY
    })
    .reply(200, getWeatherData())

  const expectedActionCreators = [
    { type: types.RECEIVE_WEATHER, weather: getWeatherData() }]

  const store = mockStore({
    current: {},
    weather: {}
  })

  return store.dispatch(actions.setWeatherViaCity('London'))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActionCreators, 'when successfully fetched the latest weather')
    })
})

test.skip('setWeatherViaLatLon action creator works', t => {
  nock('http://api.openweathermap.org')
    .get('/data/2.5/weather')
    .query({
      lat: 51.51,
      lon: -0.13,
      APPID: process.env.OPENWEATHERMAP_APIKEY
    })
    .reply(200, getWeatherData())

  const expectedActionCreators = [
    { type: types.RECEIVE_WEATHER, weather: getWeatherData() }]

  const store = mockStore({
    current: {},
    weather: {}
  })

  return store.dispatch(actions.setWeatherViaLatLon(51.51, -0.13))
    .then(() => {
      t.deepEqual(store.getActions(), expectedActionCreators, 'when successfully fetched the latest weather')
    })
})