import * as actionTypes from './actionTypes'

const initialState = {
  isCelsius: true,
  currentLocationId: -1,
  weatherApiKey: process.env.WUNDERGROUND_APIKEY,
  geocodeApiKey: process.env.G_GEOCODE_APIKEY
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE:
      return { ...action.settings }
    case actionTypes.UPDATE_ISCELSIUS:
      return { ...state, isCelsius: action.isCelsius }
    case actionTypes.UPDATE_CURRENT_LOCATION_ID:
      return { ...state, currentLocationId: action.locationId }
    default:
      return state
  }
}