import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

import { getLocation, getConditions, getForecastDays, getForecastHours } from '../data/wu'
import locations from 'modules/locations'
import weathers from 'modules/weathers'
import { getBase, getApiFragment } from 'url_builders/wu'
import rawResponse from '../data/wu.json'
import adapter from 'adapters/wu'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)
describe('weathers actions', () => {
  const lat = -41.29, lng = 174.78, locationId = 1

  afterEach(() => {
    nock.cleanAll()
  })

  test('getForecastViaLocationId action creator works', () => {
    nock(getBase())
      .get(getApiFragment('hourly10day', process.env.WUNDERGROUND_APIKEY, lat, lng))
      .reply(200, rawResponse.h10)
    nock(getBase())
      .get(getApiFragment('forecast10day', process.env.WUNDERGROUND_APIKEY, lat, lng))
      .reply(200, rawResponse.f10)

    const expectedActionCreators = [
      { type: weathers.actionTypes.REQUEST, locationId },
      {
        type: weathers.actionTypes.RECEIVE,
        locationId,
        weather: {
          f10: getForecastDays(),
          h10: getForecastHours()
        }
      }
    ]

    const store = mockStore({
      locations: {
        items: [undefined, { id: locationId, coords: { lat, lng } }]
      },
      weathers: {
        items: {}
      },
      settings: {
        weatherApiKey: process.env.WUNDERGROUND_APIKEY,
      }
    })

    return store.dispatch(weathers.actions.getForecastViaLocationId(locationId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActionCreators)
      })
  })

  test('getCurrentConditions action creator works', () => {
    nock(getBase())
      .get(getApiFragment('conditions', process.env.WUNDERGROUND_APIKEY, lat, lng))
      .reply(200, rawResponse.conditions)

    const expectedActionCreators = [
      { type: weathers.actionTypes.REQUEST, locationId },
      { type: locations.actionTypes.REQUEST },
      {
        type: locations.actionTypes.RECEIVE,
        location: { ...getLocation(), id: locationId }
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
        items: [undefined, { id: locationId, coords: { lat, lng } }]
      },
      weathers: {
        items: {}
      },
      settings: {
        weatherApiKey: process.env.WUNDERGROUND_APIKEY,
      }
    })

    return store.dispatch(weathers.actions.getCurrentConditions(lat, lng, locationId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActionCreators)
      })
  })

})