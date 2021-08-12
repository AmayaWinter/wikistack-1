const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('../views/layout');
const { db, Page, User } = require('../models');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({}));

app.get('/',(req, res, next) => {
  res.send(layout('This is the main page!'));
});

const init = async () => {
  await db.sync({force: true});

  const PORT = 8000

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();


db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })
