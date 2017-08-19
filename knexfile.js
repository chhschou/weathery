// Update with your config settings.
const migrations = {
  tableName: 'knex_migrations',
  directory: './server/db/migrations'
}
const seeds = {
  directory: './server/db/seeds'
}

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations,
    seeds,
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    }, 
    migrations,
    seeds,
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations,
    seeds,
  }

}