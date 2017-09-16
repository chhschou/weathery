import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import weathers from 'modules/weathers'
const { Weather } = weathers.components
const { setWeatherViaLatLon, receiveWeather } = weathers.actions
import Error from 'components/Error'
import locations from 'modules/locations'
const { getCurrentLocation, isCurrentLocationAvailable } = locations.actions
import { clearError, setError } from 'actions/error'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (isCurrentLocationAvailable()) {
      getCurrentLocation()
        .then((position) => {
          this.props.dispatch(clearError())
          const { latitude, longitude } = position.coords
          this.props.dispatch(setWeatherViaLatLon(latitude, longitude))
        })
        .catch((err) => {
          this.props.dispatch(setError(err))
        })
    }
  }

  hasWeatherToRender() {
    const { currentLocationId } = this.props
    if (currentLocationId != -1) {
      return this.props.weathers[currentLocationId] != null
    }

    return false
  }

  render() {
    return (
      <Router>
        <div className='app-container'>
          <header className='header'>
            <div className='dropdown-btn'>
              <select name="city" id="">
                <option value={{ lat: -0.13, lon: 51.51 }}>Wellington</option>
              </select>
            </div>
          </header>
          {this.props.error.msg && <Error msg={this.props.error.msg} />}
          {this.hasWeatherToRender() && <Weather />}
          <div className='bottom-nav'>
            <ul>
              <li>Now</li>
              <li>Forecast</li>
              <li>Settings</li>
            </ul>
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    weathers: state.weathers,
    currentLocationId: state.settings.currentLocationId,
    error: state.error

  }
}

export default connect(mapStateToProps)(App)