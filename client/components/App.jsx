import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'

const App = () => {

  return (
    <Router>
      <div className='app-container'>
        <h1>Hello World</h1>
      </div>
    </Router>
  )
}

export default App