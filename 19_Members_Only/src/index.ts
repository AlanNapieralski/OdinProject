import express from 'express'
import { Express } from 'express'
import { Request, Response, NextFunction } from 'express'
import { postLogin, postSignin } from './controllers/authenticationController.js'
import path from 'path'
import { db } from './db/database.js'
import query from './db/queries.js'

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
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('just checking: ' + username)
    try {
      console.log('Fetching the user info from the db')

      const user = await query.getUserByUsername(username)
      if (user === undefined) {
        console.error('the user with this username does not exist in the database')
        return done(null, false, { message: "No result from the query" })
      }

      console.log('Validating the user username')
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      console.log('Validating the user password')
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" })
      }
      console.log('all good')
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

// routing
app.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('sign-in')
  }

  res.render("dashboard", { user: req.user })
})
app.get('/dashboard', (req, res) => {
  if (req.user) {
    return res.render("dashboard", { user: req.user })
  }

  res.redirect("/log-in")
})
app.post("/dashboard", (req, res) => {
  if (req.body.action === 'request_membership') {
    if (req.user) {
      req.user.ismember = true
      query.changeMembershipStatus(req.user.id, true)
      console.log('User have become a member')
    }
    return res.render('dashboard', { user: req.user })
  }
  return res.redirect('/dashboard')
})

app.get('/log-in', (req, res) => {
  if (req.user)
    res.redirect('/dashboard')
  res.render('log-in', {})
})
app.post('/log-in', passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/dashboard' }))

app.get('/sign-in', (req, res) => {
  if (req.user)
    res.redirect('/dashboard')
  res.render('sign-in', {})
})
app.post('/sign-in', postSignin)

app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(400).send("Whoops, error!")
})

app.listen(PORT, () => console.log(`Listening on the port: ${PORT}...`))
