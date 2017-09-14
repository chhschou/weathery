import test from 'ava'
import locations from '../../client/modules/locations'
const { reducer, actionTypes } = locations

test('location reducer has initial state', t => {
  const initialState = [{
    id: 1,
    name: null,
    coordinates: { lat: null, lon: null },
  }]

  t.deepEqual(reducer(undefined, {}), initialState)
})


test('handles RECEIVE action', t => {
  const locations = [
    {
      id: 1, name: 'Wellington', countryName: 'New Zealand', coordinates: {
        lat: -41.29,
        lon: 174.77
      }
    },
    {
      id: 2, name: 'some place', countryName: 'some country', coordinates: {
        lat: -1.0,
        lon: -1.0 
      }
    }
  ]

  const nextState = reducer({}, { type: actionTypes.RECEIVE, locations: locations })

  t.is(nextState.length, 2)
  t.deepEqual(nextState[0], locations[0])
})
