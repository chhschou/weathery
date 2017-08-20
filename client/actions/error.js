import * as types from '.'

export function clearError() {
  return {
    type: types.CLEAR_ERROR
  }
}

export function setError(error) {
  return {
    type: types.SET_ERROR,
    error
  }
}