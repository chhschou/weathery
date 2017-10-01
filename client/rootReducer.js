import { combineReducers } from 'redux'
import weathers from 'modules/weathers'
import locations from 'modules/locations'
import settings from 'modules/settings'
import reducers from 'reducers'

export default combineReducers({
  weathers: weathers.reducer,
  settings: settings.reducer,
  locations: locations.reducer,
  error: reducers.error
})
