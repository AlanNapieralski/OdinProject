import express from 'express'
import { Express } from 'express'
import { Request, Response, NextFunction } from 'express'
import { postLogin, postSignin } from './controllers/authenticationController.js'
import path from 'path'
import { db } from './db/database.js'

// types

//auth
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'

const PORT = 3000

const app = express()

// basic setup
app.set("views", path.join(__dirname, "src", "views"))
app.set("view engine", "ejs");

app.use(express.static("public"))

// auth
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())
app.use(express.urlencoded({ extended: true }));


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db
        .selectFrom('user')
        .where('user.username', '=', username)
        .selectAll()
        .executeTakeFirstOrThrow()

      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)

    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  if (typeof id !== 'number') {
    return done(new Error('Invalid ID type'))
  }
  const user_id = id as number

  try {
    const user = await db
      .selectFrom('user')
      .where('user.id', '=', user_id)
      .selectAll()
      .executeTakeFirstOrThrow()

    done(null, user)
  } catch (err) {
    done(err)
  }
})

// routing
app.get('/', (req, res) => {
  if (!req.user)
    res.redirect('sign-in')

  res.render("dashboard", { user: req.user })
})
app.get('/dashboard', (req, res) => {
  if (req.user)
    res.render("dashboard", { user: req.user })

  res.redirect("/log-in")
})

app.get('/log-in', (req, res) => {
  res.render('log-in', {})
})
app.post('/log-in', postLogin)

app.get('/sign-in', (req, res) => {
  res.render('sign-in', {})
})
app.post('/sign-in', postSignin)

app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(400).send("Whoops, error!")
})

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}...`))
