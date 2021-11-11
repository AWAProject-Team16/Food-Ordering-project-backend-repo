const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/*
const passport = require('passport');
const authorization = require('./lib/authorization');
*/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const restaurantsRouter = require('./routes/restaurants');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

const app = express();

/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*authorization(app, passport);

app.get("/login", (req, res, next) => {
  res.send('login na');
});

app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.send("Dashboard for " + req.user.name);
});
*/
app.use('/', indexRouter);
// app.use('/about', (req, res) => res.render('about'));
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;