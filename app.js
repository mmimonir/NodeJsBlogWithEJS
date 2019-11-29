const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

// Import Routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// Import Middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

// Playground Routes
// const validatorRoute = require('./playground/validator')

const MONGODB_URI =
  'mongodb+srv://mmimonir:bp253236@cluster0-sy8bx.mongodb.net/exp-blog?retryWrites=true&w=majority'
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
})
// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Array
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    store
  }),
  bindUserWithRequest(),
  setLocals(),
  flash()
]

app.use(middleware)
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
// app.use('/playground', validatorRoute)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

const PORT = process.env.PORT || 8080

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Databse is Connected')
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`)
    })
  })
  .catch((e) => {
    return console.log(e)
  })
