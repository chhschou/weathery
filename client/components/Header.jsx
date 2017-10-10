import React from 'react'
import { connect } from 'react-redux'
import headerStyles from './Header.css'

export class Header extends React.Component {
  constructor(props) {
    super(props)

  }

  getLocationNames() {
    const { settings, locations } = this.props
    const location = locations.items[settings.currentLocationId]
    return location ? location : { displayCity: '', observeCity: '' }
  }

  render() {
    const { displayCity, observeCity } = this.getLocationNames()
    return (
      <header className='l-header c-header'>
        <div className='l-column'>
          <button className='button is-large o-header__button'><span className="icon"><i className="fa fa-dot-circle-o"></i></span></button>
        </div>
        <div className='l-column o-location'>
          <h1 className='title'>{displayCity}</h1>
          <h3 className='subtitle is-6'>{observeCity}</h3>
        </div>
        <div className='l-column'>
          <div className='c-right'>
            <button className='button is-large o-header__button'><span className="icon"><i className="fa fa-search"></i></span></button>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    locations: state.locations
  }
}

export default connect(mapStateToProps)(Header)