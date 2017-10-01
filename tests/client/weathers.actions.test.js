import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

import { getConditions, getForecastDays, getForecastHours } from '../data/wu'
import weathers from 'modules/weathers'
import { getBase, getApiFragment } from 'url_builders/wu'
import rawResponse from '../data/wu.json'
import adapter from 'adapters/wu'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)
describe('weathers actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('getWeatherViaLocationId action creator works', () => {
    nock(getBase())
      .get(getApiFragment('conditions', process.env.WUNDERGROUND_APIKEY, -41.29, 174.78))
      .reply(200, rawResponse.conditions)
    nock(getBase())
      .get(getApiFragment('hourly10day', process.env.WUNDERGROUND_APIKEY, -41.29, 174.78))
      .reply(200, rawResponse.h10)
    nock(getBase())
      .get(getApiFragment('forecast10day', process.env.WUNDERGROUND_APIKEY, -41.29, 174.78))
      .reply(200, rawResponse.f10)

    const expectedActionCreators = [
      { type: weathers.actionTypes.REQUEST, locationId: 1 },
      {
        type: weathers.actionTypes.RECEIVE,
        locationId: 1,
        weather: {
          currentConditions: getConditions(),
          f10: getForecastDays(),
          h10: getForecastHours()
        }
      }
    ]

    const store = mockStore({
      locations: {
        items: [undefined, { id: 1, coords: { lat: -41.29, lng: 174.78 } }]
      },
      weathers: {
        items: {}
      },
      settings: {
        weatherApiKey: process.env.WUNDERGROUND_APIKEY,
      }
    })

    return store.dispatch(weathers.actions.getWeatherViaLocationId(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActionCreators)
      })
  })
})