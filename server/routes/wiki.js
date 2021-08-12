const {Page, User} = require("../../models/index");
const express = require('express');
const pageRouter = express.Router();
const addPage = require('./../../views/addPage');
const { Op } = require('sequelize');
const wikipage = require('../../views/wikipage');
const main = require('../../views/main');



module.exports = pageRouter;

pageRouter.get('/', async (req, res, next) => {
  const allPages = await Page.findAll();

  res.send(main(allPages));
});



pageRouter.post('/', async (req, res, next) => {

  try {
    const author = await User.create({
      name : req.body.authorName,
      email: req.body.authorEmail
    });
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    page.setAuthor(author);
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/wiki/' + page.slug);
  }
  catch (error) {
    next(error)
  }
});

pageRouter.get('/add', (req, res, next) => {
  //loads the add page form
  res.send(addPage());
});

pageRouter.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findAll({
      where: {
        slug: req.params.slug
      },
      // include: {
      //   model: User,
      //   as: 'author'
      // }
    });
    const author = await User.findAll({
      where: {
        id: page[0].authorId
      }
    });
    // console.log(Object.getPrototypeOf(page));
    res.send(wikipage(page[0], author[0]));
  }
  catch (error) {
    next (error)
  }
});

