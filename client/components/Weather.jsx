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
        <div className='weather-details'>
          <h2 className='city'>{name}</h2>
          <img className='location' src={getLocationImgSrc(coord)} alt='location' />
          <img className='overview' src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt={weather[0].description} />
          <h3 className='temp-high'>High {kelvinToCelsius(main.temp_max)} °C/ {kelvinToFahrenheit(main.temp_max)} °F</h3>
          <h3 className='temp-low'>Low {kelvinToCelsius(main.temp_min)} °C/ {kelvinToFahrenheit(main.temp_min)} °F</h3>
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
