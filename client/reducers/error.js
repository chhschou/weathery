import * as types from '../actions'

const initialState = {
  msg: null 
}


export default function(state=initialState, action) {
  switch(action.type) {
    case types.CLEAR_ERROR:
      return {...initialState}
    case types.SET_ERROR:
      return {...state, ...action.error}
    default:
      return state
  }
}
