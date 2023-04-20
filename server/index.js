const router = require('./routes/router.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/', router);
app.post('/', router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})