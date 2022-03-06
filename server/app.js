require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const { sequelize } = require('./models');

// const postsRouter = require('./router/posts');
const usersRouter = require('./router/users');
const app = express();

app.set('port', process.env.PORT || 5500);

// 익스프레스와 시퀄라이즈 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✔ Success: DB connection!');
  })
  .catch(err => {
    console.error('🚨 Fail: DB connection!', err);
  });

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  })
);

app.get('/', (req, res) => {
  res.status(200).send('ok');
});
// app.use('/posts', postsRouter);
app.use('/users', usersRouter);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`✔ Server running on port ${app.get('port')}`);
});
