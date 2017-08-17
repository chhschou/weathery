import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'

import Weather from './Weather'

const App = () => {

  return (
    <Router>
      <div className='app-container'>
        <h1>Weathery</h1>

        <Weather />
      </div>
    </Router>
  )
}

export default App