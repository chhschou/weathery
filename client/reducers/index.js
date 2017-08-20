import {combineReducers} from 'redux'
import weather from './weather'
import error from './error'

export default combineReducers({
  weather,
  error
})
