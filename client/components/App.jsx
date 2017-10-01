import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import weathers from 'modules/weathers'
const { Weather } = weathers.components
const { getWeatherViaLocationId, receiveWeather } = weathers.actions
import Error from 'components/Error'
import locations from 'modules/locations'
const { getUserLocation, isUserLocationAvailable, getLocationViaLatLon, receiveLocation } = locations.actions
import settings from 'modules/settings'
const { updateCurrentLocationId } = settings.actions
import { clearError, setError } from 'actions/error'
import headerCSS from './header.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { settings, dispatch } = this.props
    if (settings.currentLocationId == -1 && isUserLocationAvailable()) {
      const locationId = 0 // 0 for user location
      getUserLocation()
        .then((position) => {
          dispatch(clearError())
          const { latitude, longitude } = position.coords
          return dispatch(getLocationViaLatLon(latitude, longitude, locationId))
        })
        .then((action) => dispatch(updateCurrentLocationId(action.location.id)))
        .then((action) => dispatch(getWeatherViaLocationId(action.locationId)))
        .catch((err) => {
          console.error(err)
          return dispatch(setError(err))
        })
    }
  }

  hasWeatherToRender() {
    const { settings, weathers } = this.props
    if (settings.currentLocationId != -1) {
      return weathers.items[settings.currentLocationId] != null
    }

    return false
  }

  getLvl2Name() {
    const { settings, locations } = this.props
    if (settings.currentLocationId != -1) {
      const location = locations.items[settings.currentLocationId]
      if (location) {
        const lvl2 = location.addrComponents.find((component) => component.level == 2)

        return lvl2.longName
      }
    }

    return ''
  }

  render() {
    return (
      <Router>
        <div className='app-container'>
          <header className='l-header c-header'>
            <h1>{this.getLvl2Name()}</h1>
            <button className='o-header__button'>Search</button>
          </header>
          {this.props.error.msg && <Error msg={this.props.error.msg} />}
          {this.hasWeatherToRender() && <Weather />}
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    weathers: state.weathers,
    locations: state.locations,
    settings: state.settings,
    error: state.error
  }
}

export default connect(mapStateToProps)(App)