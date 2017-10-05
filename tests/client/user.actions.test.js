import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

import { getLocation, getConditions } from '../data/wu'
import weathers from 'modules/weathers'
import locations from 'modules/locations'
import user from 'modules/user'
import { getBase, getApiFragment } from 'url_builders/wu'
import rawResponse from '../data/wu.json'
import adapter from 'adapters/wu'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)
describe('user actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('getUserLocationAndWeather action creator works', () => {
    const lat = -41.29, lng = 174.78, locationId = 0
    nock(getBase())
      .get(getApiFragment('conditions', process.env.WUNDERGROUND_APIKEY, lat, lng))
      .reply(200, rawResponse.conditions)

    const expectedActionCreators = [
      { type: weathers.actionTypes.REQUEST, locationId },
      { type: locations.actionTypes.REQUEST },
      {
        type: locations.actionTypes.RECEIVE,
        location: { id: locationId, ...getLocation() }
      },
      {
        type: weathers.actionTypes.RECEIVE,
        locationId,
        weather: {
          currentConditions: getConditions()
        }
      }
    ]

    const store = mockStore({
      locations: {
        items: [{ id: locationId, coords: { lat, lng } }]
      },
      weathers: {
        items: {}
      },
      settings: {
        weatherApiKey: process.env.WUNDERGROUND_APIKEY,
      }
    })

    return store.dispatch(user.actions.getUserLocationAndWeather(lat, lng, locationId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActionCreators)
      })
  })
})
