const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/names', db.getNames)
app.get('/names/:id', db.getNameById)
app.post('/names', db.createName)
app.put('/names/:id', db.updateName)
app.delete('/names/:id', db.deleteName)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
