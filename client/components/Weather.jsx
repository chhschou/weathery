import React from 'react'

import { connect } from 'react-redux'

export const Weather = ({ weather }) => {
  const imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + weather.coord.lat + ',' + weather.coord.lon + '&zoom=13&size=300x300&sensor=false'

  return (
    <div className='weather'>
      <h2>Weather at {weather.name}</h2>
      <img src={imgSrc} alt='location' />
      {Object.keys(weather.main).map((k, i) => {
        return (
          <p key={i}>{k}: {weather.main[k]} </p>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  weather: state.weather
})

export default connect(mapStateToProps)(Weather)
