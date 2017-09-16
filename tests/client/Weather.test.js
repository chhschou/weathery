import test from 'ava'

import React from 'react'
import { shallow, mount } from 'enzyme'

import { Weather } from '../../client/modules/weathers/components/Weather'

import { getWUConditionsData } from './data'

test('weather component renders', t => {
  const data = getWUConditionsData()
  const wrapper = shallow(<Weather weather={data} />)
  t.is(wrapper.find('.weather').length, 1)
})