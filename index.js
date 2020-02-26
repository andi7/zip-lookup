const express = require('express')
const zipcodes = require('zipcodes')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', function(req, res) {
  const { zip } = req.query

  if (zip) {
    let data

    if (Array.isArray(zip)) {
      data = zip.map(entry => zipcodes.lookup(entry) || {})
    } else {
      data = zipcodes.lookup(zip)
    }

    if (data) {
      res.json({ success: 1, data })
    } else {
      res.status(404)
      res.json({ success: 0, message: 'No information for this zip' })
    }
  } else {
    res.status(400)
    res.json({ success: 0, message: 'Zip is required' })
  }
})

app.listen(3000)
