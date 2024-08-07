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

async function getUserByUsername(username: string) {
  return await db
    .selectFrom('user')
    .where('username', '=', username)
    .selectAll()
    .executeTakeFirst()
}

async function changeMembershipStatus(id: number, status: boolean) {
  return await db
    .updateTable('user')
    .set({
      ismember: status,
    })
    .where('id', '=', id)
    .execute()
}

export default {
  createUser,
  deleteUser,
  getUserByUsername,
  changeMembershipStatus
} 
