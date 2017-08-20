import 'babel-polyfill'
import test from 'ava'
import request from 'supertest'

import setup from './setup-server-db-env'
import createServer from '../../server/server'
setup(test, createServer)

test('get /env/<variable> works', async t => {
  const expected = 'xxx'  
  process.env.xxx = expected

  const res = await request(t.context.app)
    .get('/env/xxx')

  t.is(res.status, 200)
  t.is(res.text, expected)
})