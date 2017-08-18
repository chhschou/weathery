import React from 'react'

import { connect } from 'react-redux'

function getImgSrc({coord}) {
  const imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + coord.lat + ',' + coord.lon + '&zoom=13&size=300x300&sensor=false'

  return imgSrc
}

export const Weather = ({ weather }) => {

  return (
    <div className='weather' >
      {weather.name &&
        <div className='weather-details'>
          <h2>Weather at {weather.name}</h2>
          <img src={getImgSrc(weather)} alt='location' />
          {Object.keys(weather.main).map((k, i) => {
            return (
              <p key={i}>{k}: {weather.main[k]} </p>
            )
          })}
        </div >
      }
    </div >
  )
}

const mapStateToProps = (state) => ({
  weather: state.weather
})

export default connect(mapStateToProps)(Weather)
