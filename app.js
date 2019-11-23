const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const morgan = require('morgan');
// app.use(morgan('tiny'))

const camelcaseKeys = require('camelcase-keys')

const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, { deep: true })
    req.params = camelcaseKeys(req.params)
    req.query = camelcaseKeys(req.query)
    next()
  }
}

const omitEmpty = require('omit-empty')

const removeEmptyProperties = () => {
  return function (req, res, next) {
    req.body = omitEmpty(req.body)
    req.params = omitEmpty(req.params)
    req.query = omitEmpty(req.query)
    next()
  }
}

// Combined
// Common
// Short
// Dev
// Tiny

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(camelcase())

app.use(removeEmptyProperties())
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/example-camelcase', (req, res) => {
    console.log(req.body, req.body.firstName)
    const {firstName} = req.body.firstName;
    //console.log(req.body['first-name'], req.body)

    

    res.status(200).json({elements: req.body.firstName})
})
app.post('/example-omitempty', (req, res) => {
    const { skills } = req.body
  
    if (skills) {
        // Add skills to database

        return res.json('add database')
    }
    return res.json('skills not avaibale')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))