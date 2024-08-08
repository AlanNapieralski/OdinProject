import passport from 'passport'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'
import query from '../db/queries.js'
import { Request, Response, NextFunction } from 'express'
import { db } from '../db/database.js'
import bcrypt from 'bcryptjs'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {

      const user = await query.getUserByUsername(username)
      if (user === undefined) {
        return done(null, false, { message: "This account doesn't exist" })
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)

    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser(function(user, done) {
  console.log('serializing the user')
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializing the user')
  if (typeof id !== 'number') {
    return done(new Error('Invalid ID type'))
  }

  try {
    const user = await db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirst()

    if (user === undefined) {
      console.error('the user with this id does not exist in the database')
      return done(null, false)
    }
    return done(null, user)

  } catch (err) {
    console.error("Error: Failed deserialisation of the user")
    return done(err)
  }
})

type Info = {
  message: string
}

export function login(redirectPage: string, req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: Error, user: Express.User, info: Info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.render(redirectPage, { authError: { msg: info.message } })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.redirect('/dashboard')
    })
  })(req, res, next)
}
