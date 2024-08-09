import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import models from './src/models/sample.js'

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

app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => { // READ
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId])
})

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/users', (req, res) => { // CREATE
  return res.send('Received a POST HTTP method');
});

app.post('/messages', (req, res) => {
  const id = uuidv4()
  const message: Message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  }

  req.context.models.messages[id] = message

  return res.send(message)
})

app.put('/users/:userId', (req, res) => { // UPDATE
  return res.send(`
    PUT HTTP method on user/${req.params.userId} resource
`)
});

app.delete('/users/:userId', (req, res) => { // DELETE
  return res.send(`
    DELETE HTTP method on user/${req.params.userId} resource
`);
});

app.put('/messages/:messageId', (req, res) => {
  const newMessage = req.context.models.messages[req.params.messageId]
  newMessage.text = req.body.text
  res.send(newMessage)
})

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
