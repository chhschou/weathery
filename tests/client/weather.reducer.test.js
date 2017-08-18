import test from 'ava'

import * as types from '../../client/actions'
import reducer from '../../client/reducers/weather'

test('weather reducer has initial state', t => {
  const initialState = {
    name: null,
    coord: {lat: null, lon: null},
    main: []
  }

  t.deepEqual(reducer(undefined, {}), initialState)
})


test('handles RECEIVE_WEATHER action', t => {
  const nextState = reducer({}, {type: types.RECEIVE_WEATHER, weather: {name: 'new weather'}})

  t.is(nextState.name, 'new weather')
})