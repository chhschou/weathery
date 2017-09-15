import * as actionTypes from './actionTypes'

const initialState = {
  isCelsius: true,
  currentLocationId: -1
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_ISCELSIUS:
      return {...state, isCelsius: action.isCelsius} 
    case actionTypes.UPDATE_LOCATION_ID:
      return {...state, currentLocationId: action.currentLocationId}
    default:
      return state
  }
}