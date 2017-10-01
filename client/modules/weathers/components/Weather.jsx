import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import css from './weather.css'

function getLocationImgSrc(coord) {
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lng}&zoom=13&size=300x300&sensor=false`
  return imgSrc
}

export const Weather = ({ location, weather, isCelsius }) => {
  const { currentConditions, h10, f10 } = weather
  return (
    <div className='l-wrap weather' >
      <section className='l-page__section c-page__section'>
        <header className='o-datetime t3'>{moment.unix(currentConditions.timeStamp).toString()}</header>
        <div className='c-temp'>
          {isCelsius
            ?
            <div className='o-temp--celsius'>
              <span>{currentConditions.tempC}</span>
              <span>°C</span>
            </div>
            :
            <div className='o-temp--fahrenheit'>
              <span>{currentConditions.tempF}</span>
              <span>°F</span>
            </div>
          }
        </div>
        <img className='o-icon' src={currentConditions.iconUrl} alt={currentConditions.text} />
        <span>{currentConditions.text}</span>
      </section>
      <section className='l-page__section'>
        <header className='t3'>Today</header>
        <div className='l-section__row'>
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
