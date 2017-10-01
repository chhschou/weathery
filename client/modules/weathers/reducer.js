import * as actionTypes from './actionTypes'

const initialState = {
  isFetching: new Set(),
  items: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE:
      state.items[action.locationId] = action.weather
      return { ...state }
    case actionTypes.REQUEST:
      state.isFetching.add(action.locationId)
      return { ...state }
    case actionTypes.RECEIVE:
      state.isFetching.delete(action.locationId)
      const weather = state.items[action.locationId]
      state.items[action.locationId] = { ...weather, ...action.weather }
      return { ...state }
    default:
      return state
  }
}