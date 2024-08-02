const { Router } = require('express')
const fs = require('fs')
const messages = require('../models/messages')

const router = Router()

router.get('/', (req, res) => {
  res.render('new', {})
})
router.post('/', (req, res) => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  messages.push({ text: req.body.message, user: req.body.author, added: formattedDate })
  res.redirect('/')
})

module.exports = router
