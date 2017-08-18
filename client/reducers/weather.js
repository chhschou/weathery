import * as types from '../actions'

const initialState = {
  name: '',
  coord: {
    lat: null,
    lon: null
  },
  main: []
}


export default function(state=initialState, action) {
  switch(action.type) {
    case types.RECEIVE_WEATHER:
      return action.weather 
    default:
      return state
  }
}