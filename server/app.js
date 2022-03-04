const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./router');
const app = express();

app.set('port', 5500);

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);

app.get('/', (req, res) => {
  res.send('Hello World from Server!');
});

app.use((err, req, res, next) => {
  console.log('에러가 발생했어요');
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
