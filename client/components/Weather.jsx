import React from 'react'
import { connect } from 'react-redux'

import { kelvinToCelsius, kelvinToFahrenheit, msToKmh, degToNN } from '../format'

function getLocationImgSrc(coord) {
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lon}&zoom=13&size=300x300&sensor=false`

  return imgSrc
}

export const Weather = ({ name, coord, wind, main, weather }) => {
  return (
    <div className='weather' >
      {name &&
        <div className='content-wrapper weather-details'>
          <h2 className='city'>{name}</h2>
          <h3 className='today'>Today</h3>
          <div className='temp-high'>
            <h3>High {kelvinToCelsius(main.temp_max)} °C/ {kelvinToFahrenheit(main.temp_max)} °F</h3>
          </div>
          <div className='temp-low'>
            <h3>Low {kelvinToCelsius(main.temp_min)} °C/ {kelvinToFahrenheit(main.temp_min)} °F</h3>
          </div>
          <div className='current'>
            <h4>Current {kelvinToCelsius(main.temp)} °C/ {kelvinToFahrenheit(main.temp)} °F</h4>
            <img className='overview' src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt={weather[0].description} />
            <span>{weather[0].description}</span>
          </div>
          <h3 className='avg-wind'>Average wind speed {msToKmh(wind.speed)} km/h {degToNN(wind.deg)}</h3>
        </div >
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  return state.weather
}

export default connect(mapStateToProps)(Weather)
