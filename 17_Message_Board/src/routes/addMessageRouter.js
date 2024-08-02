const { Router } = require('express')
const fs = require('fs')

const router = Router()

router.get('/', (req, res) => res.send('lol'))

module.exports = router
