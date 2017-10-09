import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './Weather.css'
import Temp from './objects/Temp'
import TempRange from './TempRange'


export class Weather extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { location, weather, isCelsius } = this.props
    const { currentConditions, h10, f10 } = weather
    return (
      <div className='l-wrap weather' >
        <section className='c-section c-condition'>
          <div className='l-half c-main'>
            <div className='c-body'>
              {currentConditions && (
                <img className='image o-body__img' src={currentConditions.iconUrl} alt={currentConditions.text} />
              )}
              {currentConditions && (
                <div className='subtitle'>
                  <span>{currentConditions.text}</span>
                </div>
              )}
            </div>
          </div>
          <div className='l-half c-aside'>
            {currentConditions && (
              <div className='is-size-4'>
                <Temp isCelsius={isCelsius} f={currentConditions.tempF} c={currentConditions.tempC} />
              </div>
            )}
            {f10 && (
              <div className='is-size-6'>
                <TempRange isRow isCelsius={isCelsius} range={f10[0]} />
              </div>
            )}
            {currentConditions && (
              <div className='is-size-6 c-feelslike'>
                <span>Feels like</span>
                <Temp isCelsius={isCelsius} f={currentConditions.feelslikeF} c={currentConditions.feelslikeC} />
              </div>
            )}
          </div>
        </section>
        <section className='c-section'>
          <div className='l-is-fullwidth c-flex-container c-is-column'>
            <div className='c-hscroll c-forecast-hour'>
              {h10 && h10.map((forecast, i) => {
                  const date = moment.unix(forecast.timeStamp)
                  return (
                    <div className='c-forecast-hour__item' key={i}>
                      <span className='is-uppercase is-size-5'>{date.format('h a')}</span>
                      <img src={forecast.iconUrl} alt={forecast.text} />
                      <Temp isCelsius={isCelsius} c={forecast.tempC} f={forecast.tempF} />
                    </div>
                  )
                })
              }
            </div>
            <div className='c-forecast-day'>
              {f10 && f10.map((forecast, i) => {
                  const date = moment.unix(forecast.timeStamp)
                  return (
                    <div className='c-forecast-day__item' key={i}>
                      <span className='is-uppercase is-size-5'>{date.format('ddd ') + date.date()}</span>
                      <img src={forecast.iconUrl} alt={forecast.text} />
                      <TempRange isRow isCelsius={isCelsius} range={forecast} />
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
