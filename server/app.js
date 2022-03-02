const express = require('express');
const logger = require('morgan');
const app = express();

app.set('port', 5500);

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.log('에러가 발생했어요');
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
