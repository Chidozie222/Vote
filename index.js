const express = require('express');
const cors = require('cors')
const home = require('./home')
const app = express();
app.use(express.json())
app.use(cors())
app.use('*', home)

app.listen(2000, (err, res) => {
    console.log('this port is running on 2000');
})