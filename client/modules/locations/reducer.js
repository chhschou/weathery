import * as actionTypes from './actionTypes.js'

const initialState = {
  isFetching: false,
  items: []
}

export default function (state = initialState, action) {

  switch (action.type) {
    case actionTypes.REQUEST:
      state.isFetching = true
      return { ...state }
    case actionTypes.RECEIVE:
      const { items } = state
      const location = action.location
      if (items.length) {
        items[1] = location // reserve 0th for user current location
      } else items.push(location)
      location.id = items.indexOf(location)
      state.isFetching = false
      return { ...state }
    default:
      return state
  }
}
