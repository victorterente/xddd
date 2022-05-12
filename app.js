var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pessoaRouter = require('./routes/pessoaroutes');
var localRouter = require('./routes/localroutes');
var tipolocalRouter = require('./routes/tipolocalroutes');
var eventoRouter = require('./routes/eventoroutes');
var tlRouter = require('./routes/tlroutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pessoa', pessoaRouter);
app.use('/local', localRouter);
app.use('/tipolocal', tipolocalRouter);
app.use('/evento', eventoRouter);
app.use('/tl', tlRouter);

module.exports = app;