const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

app.use(bodyParser())
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.status(200).send('<h1>My API</h1>')
})

const { userRouter, imageRouter } = require('./router')

app.use('/users', userRouter)
app.use('/image', imageRouter)

app.listen(2001, () => console.log(2001))