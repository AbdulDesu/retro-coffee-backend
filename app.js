const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// routes sources
const indexRouter = require('./routes/index')
const cartRouter = require('./routes/cart')
const historyRouter = require('./routes/history')
const orderRouter = require('./routes/orders')
const favoriteRouter = require('./routes/favorite')
const categoryRouter = require('./routes/category')
const accountRouter = require('./routes/account')
const customerRouter = require('./routes/customer')
const productRouter = require('./routes/product')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// cors
const corsOptions = {
  origin: '*', // All Domains
  method: ['*'], // All Methods
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With']
}
app.use(cors(corsOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// routes images
app.use('/images', express.static('./uploads'))

// routes access
app.use('/', indexRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/history', historyRouter)
app.use('/favorite', favoriteRouter)
app.use('/category', categoryRouter)
app.use('/account', accountRouter)
app.use('/customer', customerRouter)
app.use('/product', productRouter)

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
