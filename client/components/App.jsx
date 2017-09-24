import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import weathers from 'modules/weathers'
const { Weather } = weathers.components
const { setWeatherViaLatLon, receiveWeather } = weathers.actions
import Error from 'components/Error'
import locations from 'modules/locations'
const { getUserLocation, isUserLocationAvailable, getLocationViaLatLon } = locations.actions
import settings from 'modules/settings'
import { clearError, setError } from 'actions/error'
import headerCSS from './header.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {currentLocationId, dispatch} = this.props
    if (currentLocationId == -1 && this.props.isUserLocationAvailable()) {
      getUserLocation()
        .then((position) => {
          dispatch(clearError())
          dispatch(settings.actions.updateCurrentLocationId(0)) // 0 for user location
          const { latitude, longitude } = position.coords
          this.props.dispatch(getLocationViaLatLon(latitude, longitude))
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

  getLvl2Name() {
    if (this.props.currentLocationId != -1 && this.props.locations[this.props.currentLocationId]) {
      const location = this.props.locations[this.props.currentLocationId]
      const lvl2 = location.addrComponents.find((component) => component.level == 2)

      return lvl2.longName
    }

    return ''
  }

  toggleMenu() {
    console.log('toggle')
  }


  render() {
    return (
      <Router>
        <div className='app-container'>
          <header className='l-header c-header'>
            <button className='o-header__button' onClick={this.toggleMenu.bind(this)}>|||</button>
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
    currentLocationId: state.settings.currentLocationId,
    error: state.error
  }
}

export default connect(mapStateToProps)(App)