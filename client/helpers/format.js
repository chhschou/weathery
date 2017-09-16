export function kelvinToCelsius(kelvin) {
  return kelvin - 273.15
}

export function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32
}

export function kelvinToFahrenheit(kelvin) {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin))
}

export function msToKmh(ms) {
  return ms * 3600 / 1000
}

export function degToNN(deg) {
  const quadrant = deg / 22.5
  if (quadrant > 15 && quadrant > 0 && quadrant <= 1)
    return 'N'
  else if (quadrant > 1 && quadrant <= 3)
    return 'NE'
  else if (quadrant > 3 && quadrant <= 5)
    return 'E'
  else if (quadrant > 5 && quadrant <= 7)
    return 'SE'
  else if (quadrant > 7 && quadrant <= 9)
    return 'S'
  else if (quadrant > 9 && quadrant <= 11)
    return 'SW'
  else if (quadrant > 11 && quadrant <= 13)
    return 'W'
  else if (quadrant > 13 && quadrant <= 15)
    return 'NW'
}