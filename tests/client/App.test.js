import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'

import React from 'react'
import { Provider } from 'react-redux'
import App from '../../client/components/App'

const mockStore = configureMockStore()

test('App rendered', () => {
  const store = mockStore({
    locations: { items: [] },
    weathers: {},
    settings: { currentLocationId: -1 },
    error: {}
  })

  const wrapper = mount(<Provider store={store}><App /></Provider>)
  expect(wrapper.find('.app-container').length).toBe(1)
})
