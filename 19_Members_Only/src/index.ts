import express from 'express'
import { Express } from 'express'
import { Request, Response, NextFunction } from 'express'
import { postLogin, signInPost } from './controllers/authenticationController.js'
import path from 'path'
import query from './db/queries.js'
import bcrypt from 'bcryptjs'
//auth
import session from 'express-session'
import passport from 'passport'

const PORT = 3000

const app = express()

// basic setup
app.set("views", path.join(__dirname, "src", "views"))
app.set("view engine", "ejs");
app.use(express.static("public"))

//auth
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }));

// routing
app.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('log-in')
  }

  return res.render("dashboard", { user: req.user })
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
    }
    return res.render('dashboard', { user: req.user })
  }
  return res.redirect('/dashboard')
})

app.get('/log-in', (req, res) => {
  if (req.user)
    return res.redirect('/dashboard')
  return res.render('log-in')
})

app.post('/log-in', postLogin)

app.get('/sign-in', (req, res) => {
  if (req.user)
    return res.redirect('/dashboard')
  return res.render('sign-in', {})
})
app.post('/sign-in', ...signInPost)


// errors
app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(400).send("Whoops, error!")
})



app.listen(PORT, () => console.log(`Listening on the port: ${PORT}...`))
