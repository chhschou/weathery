import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Weather from './Weather'
import Error from './Error'
import { getCurrentLocation, isCurrentLocationAvailable } from '../actions/location'
import { setWeatherViaLatLon } from '../actions/weather'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (isCurrentLocationAvailable()) {
      getCurrentLocation(
        (position) => {
          const { latitude, longitude } = position.coords
          this.props.dispatch(setWeatherViaLatLon(latitude, longitude))
        },
        (err) => {
        })
    }
  }

  render() {
    return (
      <Router>
        <div className='app-container'>
          <h1>Weathery</h1>
          {this.props.errorMessage && <Error msg={this.props.errorMessage} />}
          <Weather />
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(App)