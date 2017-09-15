import test from 'ava'
import settings from '../../client/modules/settings'

test('settings has correct initial state', t => {
  const expected = {
    isCelsius: true,
    currentLocationId: -1
  }

  const nextState = settings.reducer(undefined, {})
  t.deepEqual(nextState, expected)
})

test('current location id updates correctly', t => {
  const expected = 2
  const action = {
    type: settings.actionTypes.UPDATE_LOCATION_ID, 
    currentLocationId: expected
  }

  const nextState = settings.reducer(undefined, action)
  t.is(nextState.currentLocationId, expected)
})

test('isCelsius updates correctly', t => {
  const expected = false
  const action = {
    type: settings.actionTypes.UPDATE_ISCELSIUS, 
    isCelsius: expected
  }

  const nextState = settings.reducer(undefined, action)
  t.is(nextState.isCelsius, expected)
})