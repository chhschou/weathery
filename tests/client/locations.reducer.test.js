import locations from 'modules/locations'
import geoCode from '../data/googleGeocode'
const { reducer, actionTypes } = locations

test('has correct initial state', () => {
  const expected = {
    isFetching: false,
    items: []
  }

  expect(reducer(undefined, {})).toEqual(expected)
})


test('handles RECEIVE action', () => {
  const location = geoCode.extractLocation() 
  const nextState = reducer(undefined, { type: actionTypes.RECEIVE, location: location })

  expect(Object.keys(nextState).length).toBe(2)
  expect(nextState.items[0]).toBeUndefined()
  expect(nextState.items[1]).toBe(location)
})
