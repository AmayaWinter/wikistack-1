const {Page, User} = require("../../models/index");
const express = require('express');
const userRouter = express.Router();
const userList = require('../../views/userList');
const userPages = require('../../views/userPages');
module.exports = userRouter;


userRouter.get('/', async (req, res, next) => {
  const authors = await User.findAll();
  res.send(userList(authors));
});

userRouter.get('/:id', async (req, res, next) => {

  const pages = await Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  const author = await User.findAll({
    where: {
      id: req.params.id
    }
  });

  res.send(userPages(author[0], pages));
});