import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely"

export interface Database {
  user: UserTable
  post: PostTable
}

export interface UserTable {
  id: Generated<number>

  first_name: string
  last_name: string | null
  username: string
  password: string
  ismember: boolean
}

export interface PostTable {
  id: Generated<number>

  user_id: number
  title: string
  message: string
  added: ColumnType<Date, string | undefined, never>
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

export type Post = Selectable<PostTable>
export type NewPost = Insertable<PostTable>
export type PostUpdate = Updateable<PostTable>
