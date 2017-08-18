import test from 'ava'
import {shallow, mount} from 'enzyme'
import 'jsdom-global/register'
import configureMockStore from 'redux-mock-store'

import React from 'react'
import {Provider} from 'react-redux'
import App from '../../client/components/App'

const mockStore = configureMockStore()

test('app rendered', t => {
  const store = mockStore({
    current: {},
    weather: {}
  })

  const wrapper = mount(<Provider store={store}><App /></Provider>)
  t.is(wrapper.find('.app-container').length, 1)
})
