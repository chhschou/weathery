import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../../client/actionTypes'
import {
  setError,
  clearError
} from '../../client/actions/error'

const mockStore = configureMockStore([thunk])

test('clearError action creator works', () => {
  const expectedActionCreators = [{
    type: types.CLEAR_ERROR
  }]

  const store = mockStore({
    error: {
      msg: 'error had occurred'
    }
  })

  store.dispatch(clearError())
  expect(store.getActions()).toEqual(expectedActionCreators)
})


test('setError action creator works', () => {
  const expectedError = {
    request: {
      url: '/data',
      header: [{
        key: 'Accept',
        value: 'application/json'
      }]
    },
    msg: 'error occurred twice'
  }

  const expectedActionCreators = [{
    type: types.SET_ERROR,
    error: expectedError
  }]

  const store = mockStore({
    error: {
      msg: 'error had occurred'
    }
  })

  store.dispatch(setError(expectedError))
  expect(store.getActions()).toEqual(expectedActionCreators)
})