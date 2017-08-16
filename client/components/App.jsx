import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentWeather: {}
    } 
  }

  render () {
    return (
      <Router>
        <div className='app-container'>
          <h1>Hello World</h1>
        </div>
      </Router>
    )
  }
}