require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./router');
const postsRouter = require('./router/posts');
const usersRouter = require('./router/users');
const app = express();

app.set('port', process.env.PORT || 5500);

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  const err = new Error('Can not find router');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ', ${app.get('port')}`);
});
