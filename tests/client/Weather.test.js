import test from 'ava'

import React from 'react'
import { shallow, mount } from 'enzyme'

import { Weather } from '../../client/modules/weathers/components/Weather'

import { getConditions } from '../data/wu.js'

test('weather component renders', t => {
  const data = getConditions()
  const wrapper = shallow(<Weather weather={data} />)
  t.is(wrapper.find('.weather').length, 1)
})