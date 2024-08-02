const path = require("path")
const express = require("express")
const app = express()

const addMessageRouter = require('./routes/addMessageRouter')
const indexRouter = require('./routes/indexRouter')

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use('/new', addMessageRouter)
app.use((req, res, next) => {
  res.status(404).send('Whoops, error!')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log('The server is running!,')
})
