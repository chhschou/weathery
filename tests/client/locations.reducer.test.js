import test from 'ava'
import locations from '../../client/modules/locations'
const { reducer, actionTypes } = locations

test('has correct initial state', t => {
  const expected = {}
  t.deepEqual(reducer(undefined, {}), expected)
})


test('handles RECEIVE action', t => {
  const locations = [
    {
      id: 1, name: 'Wellington', countryName: 'New Zealand', coordinates: {
        lat: -41.29,
        lng: 174.77
      }
    },
    {
      id: 2, name: 'some place', countryName: 'some country', coordinates: {
        lat: -1.0,
        lng: -1.0
      }
    }
  ]

  const nextState = reducer({}, { type: actionTypes.RECEIVE, locations: locations })

  t.is(Object.keys(nextState).length, 2)
  t.deepEqual(nextState[0], locations[0])
})
