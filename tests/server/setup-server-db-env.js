import test from 'ava'
import knex from 'knex'
import configs from '../../knexfile'

export default (test, createServer) => {
  test.beforeEach(t => {
    t.context.db = knex(configs.test)
    createServer && (t.context.app = createServer(t.context.db))
    return t.context.db.migrate.latest()
      .then(() => {
        return t.context.db.seed.run()
      })
  })

  test.afterEach(t => {
    return t.context.db.migrate.rollback()
      .then(() => {
        return t.context.db.destroy()
      })
  })

}