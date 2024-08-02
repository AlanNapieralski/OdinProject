const fs = require('fs')

function parseMessageJSON(req, res, next) {
  fs.readFile('./models/messages.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    req.messages = JSON.parse(data)
    console.log(JSON.parse(data))
    next()
  })
}

module.exports = { parseMessageJSON }
