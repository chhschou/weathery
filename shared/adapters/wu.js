function getLocation(rawResponse) {
  // take location out of a current observation stream
  const raw = rawResponse.current_observation
  const data = {
    timeStamp: raw.observation_epoch,
    displayCity: raw.display_location.city,
    displayFull: raw.display_location.full,
    coords: {
      lat: raw.display_location.latitude,
      lng: raw.display_location.longitude,
      elev: raw.display_location.elevation
    },
    observeCity: raw.observation_location.city,
  }

}

function getConditions(rawResponse) {
  const raw = rawResponse.current_observation
  const data = {
    timeStamp: raw.observation_epoch,
    text: raw.weather,
    tempF: raw.temp_f,
    tempC: raw.temp_c,
    feelslikeF: raw.feelslike_f,
    feelslikeC: raw.feelslike_c,
    iconUrl: raw.icon_url
  }

  return data
}

function getForecastDays(rawResponse) {
  const rawTextForecasts = rawResponse.forecast.txt_forecast.forecastday
  const data = []
  rawTextForecasts
    .filter((t) => t.period % 2 == 0)
    .forEach((t) => {
      const item = {
        iconTextF: t.fcttext,
        iconTextC: t.fcttext_metric
      }
      data.push(item)
    })

  const rawSimpleForecasts = rawResponse.forecast.simpleforecast.forecastday
  rawSimpleForecasts.forEach((t, i) => {
    const item = data[i]
    item.timeStamp = t.date.epoch,
      item.tempHighF = t.high.fahrenheit,
      item.tempHighC = t.high.celsius,
      item.tempLowF = t.low.fahrenheit,
      item.tempLowC = t.low.celsius,
      item.iconUrl = t.icon_url,
      item.text = t.conditions
  })

  return data
}

function getForecastHours(rawResponse) {
  const rawHours = rawResponse.hourly_forecast
  const data = rawHours.map((t) => {
    return {
      timeStamp: t.FCTTIME.epoch,
      tempF: t.temp.english,
      tempC: t.temp.metric,
      text: t.condition,
      iconUrl: t.icon_url,
      feelslikeF: t.feelslike.english,
      feelslikeC: t.feelslike.metric,
    }
  })

  return data
}

module.exports = {
  getLocation,
  getConditions,
  getForecastDays,
  getForecastHours
}