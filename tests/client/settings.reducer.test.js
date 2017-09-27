import settings from 'modules/settings'

test('settings has correct initial state', () => {
  const expected = {
    isCelsius: true,
    currentLocationId: -1,
    weatherApiKey: process.env.WUNDERGROUND_APIKEY,
    geocodeApiKey: process.env.G_GEOCODE_APIKEY
  }

  const nextState = settings.reducer(undefined, {})
  expect(nextState).toEqual(expected)
})

test('current location id updates correctly', () => {
  const expected = 2
  const action = {
    type: settings.actionTypes.UPDATE_CURRENT_LOCATION_ID,
    currentLocationId: expected
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