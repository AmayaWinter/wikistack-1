const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('../views/layout');
const { db, Page, User } = require('../models');
const pageRouter = require('./routes/wiki');


app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/wiki', pageRouter);
// app.use('/user', pageRouter);

app.get('/',(req, res, next) => {
  res.redirect('/wiki');
});


const init = async () => {
  await db.sync();

  const PORT = 8000

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();


// db.authenticate()
//   .then(() => {
//     console.log('connected to the database');
//   })
