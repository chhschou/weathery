import test from 'ava'

import * as types from '../../client/actions'
import * as actions from '../../client/actions/error'
import reducer from '../../client/reducers/error'

test('error reducer handles CLEAR_ERROR action', t => {
  const expected = {
    msg: null
  }

  const currentState = {msg: 'an error has occurred'}
  const clearErrorAction = actions.clearError()
  const actual = reducer(currentState, clearErrorAction)

  t.deepEqual(actual, expected) 
})