import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from 'styles/styles.css'
import user from 'modules/user'
const { getUserLocationAndWeather } = user.actions
import weathers from 'modules/weathers'
const { Weather } = weathers.components
const { getForecastViaLocationId, receiveWeather } = weathers.actions
import Error from 'components/Error'
import locations from 'modules/locations'
const { getUserLocation, isUserLocationAvailable, receiveLocation } = locations.actions
import settings from 'modules/settings'
const { updateCurrentLocationId } = settings.actions
import actions from 'actions'
const { clearError, setError } = actions.error
import Header from './Header'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { settings, initialize, getLocationAndWeather, dispatch } = this.props
    if (settings.currentLocationId == -1 && isUserLocationAvailable()) {
      initialize()
        .then(() => getLocationAndWeather(0))
    }
  }

  hasWeatherToRender() {
    const { settings, weathers } = this.props
    if (settings.currentLocationId != -1) {
      return weathers.items[settings.currentLocationId] != null
    }

    return false
  }


  render() {
    const { displayCity, observeCity } = this.getLocationNames()
    return (
      <Router>
        <div className='app-container'>
          <Header />
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

function mapDispatchToProps(dispatch) {
  return {
    initialize: () => {
      return getUserLocation()
        .then((position) => {
          dispatch(clearError())
          const { latitude, longitude } = position.coords
          return dispatch(getUserLocationAndWeather(latitude, longitude))
        })
    },
    getLocationAndWeather: (locationId) => {
      dispatch(updateCurrentLocationId(locationId))
      dispatch(getForecastViaLocationId(locationId))
        .catch((err) => {
          console.error(err)
          dispatch(setError(err))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)