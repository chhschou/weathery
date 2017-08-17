import test from 'ava'
import nock from 'nock'

test.afterEach('remove all nock bindings', t => {
  nock.cleanAll()
})