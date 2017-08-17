import test from 'ava'

import React from 'react'
import 'jsdom-global/register'
import {
  shallow,
  mount
} from 'enzyme'

import ConnectedWeatherComponent, {
  Weather
} from '../../client/components/Weather'

function getData() {
  return {
    "coord": {
      "lon": -0.13,
      "lat": 51.51
    },
    "weather": [{
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }],
    "base": "stations",
    "main": {
      "temp": 286.53,
      "pressure": 1020,
      "humidity": 71,
      "temp_min": 284.15,
      "temp_max": 289.15
    },
    "visibility": 10000,
    "wind": {
      "speed": 2.6,
      "deg": 290
    },
    "clouds": {
      "all": 0
    },
    "dt": 1502839200,
    "sys": {
      "type": 1,
      "id": 5093,
      "message": 0.0265,
      "country": "GB",
      "sunrise": 1502858864,
      "sunset": 1502911241
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
  }
}

test('weather component renders', t => {
  const data = getData()
  const wrapper = shallow( < Weather weather={data} /> )
  t.is(wrapper.find('.weather').length, 1)
})