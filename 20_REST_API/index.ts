import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import models from './src/models/sample.js'
import routes from './routes'

const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next()
})

app.use('/session', routes.session)
app.use('/users', routes.users)
app.use('/messages', routes.messages)

app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
