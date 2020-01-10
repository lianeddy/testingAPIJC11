const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser())
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).send('<h1>My API</h1>')
})

const { userRouter } = require('./router')

app.use('/users', userRouter)

app.listen(2001, () => console.log(2001))