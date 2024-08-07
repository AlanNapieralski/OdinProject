import { Request, Response, NextFunction } from "express"
import query from '../db/queries.js'
import { UserUpdate, User, NewUser } from '../types/types.js'
import passport, { authenticate } from "passport"

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  login()
}

export const postSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await query.createUser({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      ismember: false
    } as NewUser)
    login()

  } catch (err) {
    console.error('Error: User creation have failed')
    return next(err)
  }

}

function login() {
  passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/dashboard' })
}

