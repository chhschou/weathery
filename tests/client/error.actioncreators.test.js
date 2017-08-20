import test from 'ava'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../../client/actions'
import {
  clearError
} from '../../client/actions/error'

const mockStore = configureMockStore([thunk])

test('clearError action creator works', t => {
  const expectedActionCreators = [{
    type: types.CLEAR_ERROR
  }]

  const store = mockStore({
    error: {
      msg: 'error had occurred'
    }
  })

  store.dispatch(clearError())
  t.deepEqual(store.getActions(), expectedActionCreators)
})
