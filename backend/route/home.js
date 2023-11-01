const { Router } = require('express')

const home = Router()

require('../index')
home.get('/', (req, res) => {
    res.send('hello')
})

module.exports = home