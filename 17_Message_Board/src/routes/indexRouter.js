const { Router } = require('express')
const { parseMessageJSON } = require('../middleware/parseMessageJSON')

const router = Router()

router.use(parseMessageJSON)
router.get('/', (req, res) => {
  res.render('index', { messages: req.messages })
})


// functions
module.exports = router
