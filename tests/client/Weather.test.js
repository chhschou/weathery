import React from 'react'
import { shallow, mount } from 'enzyme'

import { Weather } from 'modules/weathers/components/Weather'

import { getConditions } from '../data/wu.js'

test('weather component renders', () => {
  const data = { currentConditions: getConditions() }
  const wrapper = shallow(<Weather weather={data} />)
  expect(wrapper.find('.weather').length).toBe(1)
})