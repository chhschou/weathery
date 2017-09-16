import * as actionTypes from './actionTypes'

const initialState = {
  items: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD:
    case actionTypes.UPDATE:
      state.items[action.weather.locationId] = action.weather
      return { ...state }
    case actionTypes.REQUEST:
      state.items[action.locationId].isFetching = true
      return { ...state }
    case actionTypes.RECEIVE:
      return { isFetching: false, items: action.weathers }
    default:
      return state
  }
}