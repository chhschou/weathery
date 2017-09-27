import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'dotenv/config'

// import './setup-client-env'
import { getConditions } from '../data/wu'
import weathers from 'modules/weathers'
import { getBase, getApiFragment } from '../../common/url_builders/wu'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

test('getWeatherViaLocationId action creator works', () => {
  nock(getBase())
    .get(getApiFragment('conditions', process.env.WUNDERGROUND_APIKEY, -41.29, 174.78))
    .reply(200, getConditions())

  const expectedActionCreators = [
    { type: weathers.actionTypes.REQUEST, locationId: 1 },
    { type: weathers.actionTypes.RECEIVE, locationId: 1, weather: getConditions() }]

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
    });
})