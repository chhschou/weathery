import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Weather from './Weather'
import Error from './Error'
import { getCurrentLocation, isCurrentLocationAvailable } from '../actions/location'
import { setWeatherViaLatLon } from '../actions/weather'
import { clearError, setError } from '../actions/error'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (isCurrentLocationAvailable()) {
      getCurrentLocation().then((position) => {
        this.props.dispatch(clearError())
        const { latitude, longitude } = position.coords
        this.props.dispatch(setWeatherViaLatLon(latitude, longitude)) 
      })
      .catch((err) => {
        this.props.dispatch(setError(err))
      })
    }
  }

  render() {
    return (
      <Router>
        <div className='app-container'>
          <header className='app-header'>
            <div className='content-wrapper'>
              <img src="/assets/logo.png" alt="logo"/>
              <div className='search'>
                <input type='text' placeholder='Your city name' />
                <button>Search</button>
              </div>
            </div>
          </header>
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