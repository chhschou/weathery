require('dotenv').config()
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {getCurrentLocation, isCurrentLocationAvailable} from './actions/location'
import {setWeatherViaLatLon} from './actions/weather'
import reducers from './reducers'
import App from './components/App'


let store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)) 

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )

  if (isCurrentLocationAvailable()) {
    getCurrentLocation((position) => {
      const {latitude, longitude} = position.coord
      store.dispatch(setWeatherViaLatLon(latitude, longitude))
    })
  }
})
