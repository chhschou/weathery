import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './Weather.css'
import Temp from './objects/Temp'
import TempRange from './TempRange'


export class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeForecast: 'forecast-day'
    }
  }

  getLocationImgSrc = (coord) => {
    const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lng}&zoom=13&size=300x300&sensor=false`
    return imgSrc
  }

  handleTabItemClick = (e) => {
    const currentTabItem = e.target.closest('li')
    if (currentTabItem.classList.contains('is-active')) return

    const tabs = currentTabItem.parentNode
    tabs.childNodes.forEach((tabItem) => {
      if (tabItem === currentTabItem) {
        tabItem.classList.add('is-active')
        this.setState({ activeForecast: tabItem.dataset.context })
      }
      else tabItem.classList.remove('is-active')
    })
  }

  render() {
    const { location, weather, isCelsius } = this.props
    const { currentConditions, h10, f10 } = weather
    const { activeForecast } = this.state
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
          <div className='l-flex-container'>
            <div className='tabs is-centered'>
              <ul>
                <li className='is-active' data-context='forecast-day' onClick={this.handleTabItemClick}><a>
                  <span className="icon is-small"><i className="fa fa-calendar"></i></span>
                  <span>Day</span>
                </a></li>
                <li data-context='forecast-hour' onClick={this.handleTabItemClick}><a>
                  <span className="icon is-small"><i className="fa fa-clock-o"></i></span>
                  <span>Hour</span>
                </a></li>
              </ul>
            </div>
            <div>
              {(f10 && activeForecast === "forecast-day") &&
                f10.map((forecast, i) => {
                  const date = moment.unix(forecast.timeStamp)
                  return (
                    <div key={i}>
                      <span>{date.day()}</span>
                      <span>{date.date()}</span>
                      <img src={forecast.iconUrl} alt={forecast.text} />
                      <TempRange isCelsius={isCelsius} range={forecast} />
                    </div>
                  )
                })
              }
              {(h10 && activeForecast === 'forecast-hour') &&
                h10.map((forecast, i) => {
                  const date = moment.unix(forecast.timeStamp)
                  return (
                    <div key={i}>
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
