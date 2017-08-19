import test from 'ava'
import {shallow, mount} from 'enzyme'
import React from 'react'

import Error from '../../client/components/Error'

test('Error component', t => {
  const errorMsg = 'an error'
  const wrapper = shallow(<Error msg={errorMsg} />)
  
  const render = wrapper.find('.error')
  t.is(render.length, 1, 'did not render')
  t.is(render.text(), errorMsg, 'has wrong content')
})