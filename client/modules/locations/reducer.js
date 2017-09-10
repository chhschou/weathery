import * as actionTypes from './actionTypes.js'

const initialState = [{
  id: 1,
  name: null,
  coordinates: { lat: null, lon: null },
}]

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE:
      return [...action.locations]
    default:
      return state
  }
}