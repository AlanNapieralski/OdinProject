const { Router } = require('express')
const messages = require('../models/messages.js')

const router = Router()

router.get('/', (req, res) => {
  res.render('index', { messages: messages })
})


// functions
module.exports = router
