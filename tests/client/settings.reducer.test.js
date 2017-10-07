import 'dotenv/config'
import settings from 'modules/settings'

test('settings has correct initial state', () => {
  const nextState = settings.reducer(undefined, {})
  expect(nextState).toMatchSnapshot()
})

test('current location id updates correctly', () => {
  const expected = 2
  const action = {
    type: settings.actionTypes.UPDATE_CURRENT_LOCATION_ID,
    locationId: expected
  }

  const nextState = settings.reducer(undefined, action)
  expect(nextState.currentLocationId).toBe(expected)
})

test('isCelsius updates correctly', () => {
  const expected = false
  const action = {
    type: settings.actionTypes.UPDATE_ISCELSIUS,
    isCelsius: expected
  }

  const nextState = settings.reducer(undefined, action)
  expect(nextState.isCelsius).toBe(expected)
})