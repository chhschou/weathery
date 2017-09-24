import * as actionTypes from 'modules/settings/actionTypes'

export function updateCurrentLocationId (locationId) {
  return {type: actionTypes.UPDATE_CURRENT_LOCATION_ID, locationId}
}