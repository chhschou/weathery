import test from 'ava'

import weathers from '../../client/modules/weathers'

test('has correct initialstate', t => {
  const expected = {
    items: {}
  }

  const nextState = weathers.reducer(undefined, {})
  t.deepEqual(nextState, expected)
})
