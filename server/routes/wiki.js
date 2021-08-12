const {Page} = require("../../models/index");
const express = require('express');
const pageRouter = express.Router();
const addPage = require('./../../views/addPage');

module.exports = pageRouter;

pageRouter.get('/', async (req, res, next) => {
  res.send('This is the wiki page');
});



pageRouter.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  }
  catch (error) {
    next(error)
  }
});

pageRouter.get('/add', (req, res, next) => {
  //loads the add page form
  res.send(addPage());
});

