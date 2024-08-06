import { db } from '../db/database.js'
import { UserUpdate, User, NewUser } from '../types/types.js'

async function createUser(user: NewUser) {
  return await db.insertInto('user')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow()
}

async function deleteUser(id: number) {
  return await db.deleteFrom('user').where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export default {
  createUser,
  deleteUser
} 
