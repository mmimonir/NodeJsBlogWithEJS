const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

// Import Routes
const authRoutes = require('./routes/authRoute')

// Setpur View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Array
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json()
]

app.use(middleware)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

const PORT = process.env.PORT || 8080

mongoose
  .connect(
    'mongodb+srv://mmimonir:@bp253236@cluster0-sy8bx.mongodb.net/exp-blog?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Databse is Connected')
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`)
    })
  })
  .catch((e) => {
    return console.log(e)
  })
