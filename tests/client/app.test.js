import test from 'ava'
import {shallow, mount} from 'enzyme'
import 'jsdom-global/register'

import React from 'react'
import App from '../../client/components/App'


test('app rendered', t => {
  const wrapper = shallow(<App />)
  t.is(wrapper.find('.app-container').length, 1)
})
