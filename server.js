const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const User = mongoose.model('User', {
  name: String,
  email: String,
  surname: String,
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', async (req, res) => {
  const users = await User.find({}).limit(10)
  res.send(users)
})

app.post('/users', async (req, res) => {
  const user = await new User(req.body.user).save()
  res.send(user)
})

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/ep1', {
    useNewUrlParser: true
  })
  await app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  })
}

run()
