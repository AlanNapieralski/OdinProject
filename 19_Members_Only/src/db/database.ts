import { Database } from '../types/types.js'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'members_only',
    host: 'localhost',
    user: 'postgres',
    password: 'alano100',
    port: 5432,
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})
