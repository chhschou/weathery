import {shallow, mount} from 'enzyme'
import React from 'react'

import Error from '../../client/components/Error'

test('Error component', () => {
  const errorMsg = 'an error'
  const wrapper = shallow(<Error msg={errorMsg} />)
  
  const render = wrapper.find('.error')
  expect(render.length).toBe(1)
  expect(render.text()).toBe(errorMsg)
})