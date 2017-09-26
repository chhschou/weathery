import request from 'superagent'
import { REQUEST, RECEIVE } from 'modules/locations/actionTypes'
import actions from 'actions'
import weather from 'modules/weathers'
import adapter from '../../../common/adapters/googleGeocode'

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

export const getLocationViaLatLon = (lat, lng) => {
  return (dispatch, getState) => {
    dispatch(requestLocation())
    const apiKey = process.env.G_GEOCODE_APIKEY
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
    const url = `${baseUrl}?latlng=${lat},${lng}&key=${apiKey}`
    return request.get(url)
      .then((geoCodeRes) => {
        const location = { ...(adapter.extractLocation(geoCodeRes)) }
        return dispatch(receiveLocation(location))
      })
  }
}