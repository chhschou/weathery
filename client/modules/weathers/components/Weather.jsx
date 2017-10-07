import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './Weather.css'
import Temp from './objects/Temp'
import TempRange from './TempRange'

const state = {
  tabsSelectedIndex: 1,
}

function getLocationImgSrc(coord) {
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lng}&zoom=13&size=300x300&sensor=false`
  return imgSrc
}

export const Weather = ({ location, weather, isCelsius }) => {
  const { currentConditions, h10, f10 } = weather
  return (
    <div className='l-wrap weather' >
      <section className='c-section'>
        <div className='l-half'>
          {currentConditions && (
            <img className='icon is-large o-icon' src={currentConditions.iconUrl} alt={currentConditions.text} />
          )}
          {currentConditions && (
            <div className='subtitle'>
              <span>{currentConditions.text}</span>
            </div>
          )}
        </div>
        <div className='l-half'>
          {currentConditions && (
            <div className='is-size-4'>
              <Temp isCelsius={isCelsius} f={currentConditions.tempF} c={currentConditions.tempC} />
            </div>
          )}
          {f10 && (
            <div className='is-size-6'>
              <TempRange isRow={true} isCelsius={isCelsius} range={f10[0]} />
            </div>
          )}
          {currentConditions && (
            <div className='is-size-6'>
              <span>Feels like</span>
              <Temp isCelsius={isCelsius} f={currentConditions.feelslikeF} c={currentConditions.feelslikeC} />
            </div>
          )}
        </div>
      </section>
      <section className='c-section'>
        <div className='container'>
          <div className='tabs'>
            <ul>
              <li className='is-active'><a>
                <span className="icon is-small"><i className="fa fa-calendar"></i></span>
                <span>Day</span>
              </a></li>
              <li><a>
                <span className="icon is-small"><i className="fa fa-clock-o"></i></span>
                <span>Hour</span>
              </a></li>
            </ul>
          </div>
          <div>
            {(f10 && state.tabsSelectedIndex === 0) &&
              f10.map((forecast) => {
                const date = moment.unix(forecast.timeStamp)
                return (
                  <div>
                    <span>{date.day()}</span>
                    <span>{date.date()}</span>
                    <img src={forecast.iconUrl} alt={forecast.text} />
                    <TempRange isCelsius={isCelsius} range={forecast} />
                  </div>
                )
              })
            }
            {(h10 && state.tabsSelectedIndex === 1) &&
              h10.map((forecast) => {
                const date = moment.unix(forecast.timeStamp)
                return (
                  <div>
                    <span>{date.format('h a')}</span>
                    <img src={forecast.iconUrl} alt={forecast.text} />
                    <Temp isCelsius={isCelsius} c={forecast.tempC} f={forecast.tempF} />
                    <span>Feels like</span>
                    <Temp isCelsius={isCelsius} c={forecast.feelslikeC} f={forecast.feelslikeF} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </div >
  )
}

const mapStateToProps = (state) => {
  const { isCelsius, currentLocationId } = state.settings
  const location = state.locations.items[currentLocationId]
  const weather = state.weathers.items[currentLocationId]
  return {
    location: location,
    weather: weather,
    isCelsius: isCelsius
  }
}

export default connect(mapStateToProps)(Weather)
