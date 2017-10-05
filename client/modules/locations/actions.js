import request from 'superagent'
import { REQUEST, RECEIVE, EDIT } from 'modules/locations/actionTypes'
import actions from 'actions'
import weather from 'modules/weathers'
import adapter from 'adapters/googleGeocode'

export const receiveLocation = (location) => {
  return { type: RECEIVE, location }
}
export const isUserLocationAvailable = () => navigator.geolocation

export const getUserLocation = () => {
  if (isUserLocationAvailable()) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }
}

export const requestLocation = () => {
  return { type: REQUEST }
}

export const getLocationViaAddr = (lvl2Addr, country) => {
  return (dispatch) => {
    // dispatch(requestLocation())
  }
}

export function editLocation(location) {
  return { type: types.EDIT, location }
}