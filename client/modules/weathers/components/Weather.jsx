import React from 'react'
import { connect } from 'react-redux'

import helpers from '../../../helpers'
const { kelvinToCelsius, kelvinToFahrenheit, msToKmh, degToNN } = helpers.format

import css from './weather.css'

function getLocationImgSrc(coord) {
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lng}&zoom=13&size=300x300&sensor=false`

  return imgSrc
}

export const Weather = ({ location, weather, isCelsius }) => {
  const { currentCondition, h10, f10 } = weather
  
  return (
    <div className='l-wrap' >
      {name &&
        <div>
          <section className='l-page__section'>
            <header className='o-datetime t3'>{'<date and time of current forecast>'}</header>
            <div className='c-temp'>
              {isCelsius
                ?
                <div className='o-temp--celsius'>
                  <span>{kelvinToCelsius(main.temp)}</span>
                  <span>°C</span>
                </div>
                :
                <div className='o-temp--fahrenheit'>
                  <span>{kelvinToFahrenheit(main.temp)}</span>
                  <span>°F</span>
                </div>
              }
            </div>
            <img className='o-icon' src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt={weather[0].description} />
            <span>{weather[0].description}</span>
          </section>
          <section className='l-page__section'>
            <header className='t3'>Today</header>
            <div className='l-section__row'>
              <div className='c-temp--high'>
                <i className="fa fa-thermometer-three-quarters fa-4x o-temp__icon--high" aria-hidden="true"></i>
                {isCelsius
                  ? <h3>{kelvinToCelsius(main.temp_max)} °C</h3>
                  : <h3>{kelvinToFahrenheit(main.temp_max)} °F</h3>
                }
              </div>
              <div className='c-temp--low'>
                <i className="fa fa-thermometer-quarter fa-4x o-temp__icon--low" aria-hidden="true"></i>
                {isCelsius
                  ? <h3>{kelvinToCelsius(main.temp_min)} °C</h3>
                  : <h3>{kelvinToFahrenheit(main.temp_min)} °F</h3>
                }
              </div>
            </div>
          </section>
        </div >
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  const { isCelsius, currentLocationId } = state.appSettings
  const location = state.locations.find((location) => location.id == currentLocationId)
  const weather = state.weathers.find((weather) => weather.locationId == currentLocationId)
  return {
    location: location,
    weather: weather,
    isCelsius: isCelsius
  }
}

export default connect(mapStateToProps)(Weather)
