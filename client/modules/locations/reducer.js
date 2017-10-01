import * as actionTypes from './actionTypes'

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
      if (location.id == undefined) {
        items.push(location)
        location.id = items.indexOf(location)
      } else {
        items[location.id] = location
      }
      state.isFetching = false
      return { ...state }
    default:
      return state
  }
}
