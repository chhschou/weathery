import 'dotenv/config'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'
import App from './components/App'

const configureStore = () => {
  const store = createStore(rootReducer, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}

const store = configureStore()

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./components/App', () => {
        render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('app')
        )
      })
    }
  }
})
