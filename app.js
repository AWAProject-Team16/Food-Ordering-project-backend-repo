const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const restaurantsRouter = require('./routes/restaurants');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('./lib/database.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

module.exports = app;