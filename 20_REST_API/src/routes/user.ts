import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => { // READ
  return res.send(Object.values(req.context.models.users))
})

router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId])
})

router.post('/', (req, res) => { // CREATE
  return res.send('Received a POST HTTP method')
})

router.put('/:userId', (req, res) => { // UPDATE
  return res.send(`
    PUT HTTP method on user/${req.params.userId} resource
`)
})

router.delete('/:userId', (req, res) => { // DELETE
  return res.send(`
    DELETE HTTP method on user/${req.params.userId} resource
`)
})


export default router
