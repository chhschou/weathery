import nock from 'nock'

afterEach('remove all nock bindings', () => {
  nock.cleanAll()
})