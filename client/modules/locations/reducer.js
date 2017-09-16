import * as actionTypes from './actionTypes.js'

const initialState = {}

export default function (state = initialState, action) {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.RECEIVE:
      action.locations.forEach((l) => newState[l.id] = l)
      return newState
    case actionTypes.ADD:
    case actionTypes.UPDATE:
      newState[action.location.id] = action.location
      return newState
    default:
      return state
  }
}
