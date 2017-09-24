import * as actionTypes from './actionTypes.js'

const initialState = {
  isFetching: new Set(),
  items: {}
}

export default function (state = initialState, action) {

  switch (action.type) {
    case actionTypes.REQUEST:
      state.isFetching.add(action.locationId)
      return {...state}
    case actionTypes.RECEIVE:
      const location = action.location
      state.items[location.id] = location
      return {...state}
    default:
      return state
  }
}
