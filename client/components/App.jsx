import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Weather from './Weather'
import Error from './Error'
import { getCurrentLocation, isCurrentLocationAvailable } from '../actions/location'
import { setWeatherViaLatLon } from '../actions/weather'
import { clearError } from '../actions/error'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (isCurrentLocationAvailable()) {
      getCurrentLocation(
        (position) => {
          this.props.dispatch(clearError())
          const { latitude, longitude } = position.coords
          this.props.dispatch(setWeatherViaLatLon(latitude, longitude))
        },
        (err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <Router>
        <div className='app-container'>
          <h1>Weathery</h1>
          {this.props.error.msg && <Error msg={this.props.error.msg} />}
          <Weather />
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps)(App)