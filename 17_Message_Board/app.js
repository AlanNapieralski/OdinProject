const path = require("path")
const express = require("express")
const app = express()

const addMessageRouter = require('./src/routes/addMessageRouter')
const indexRouter = require('./src/routes/indexRouter')

const parentDir = path.join(__dirname, 'src')
app.set("views", path.join(parentDir, "views"))
app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter)
app.use('/new', addMessageRouter)
app.use((req, res, next) => {
  res.status(404).send('Whoops, error!')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log('The server is running!,')
})
