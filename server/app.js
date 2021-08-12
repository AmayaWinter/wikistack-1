const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({}));
const layout = require('../views/layout');

app.get('/',(req, res, next) => {
  res.send(layout('This is the main page!'));
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});