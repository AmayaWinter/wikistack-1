const { text } = require('express');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

function createSlug(title) {
  return title.replace(/[^a-z\s]/ig, '').replaceAll(' ', '_');
}

Page.addHook('beforeValidate', (instance, options) => {
  instance.slug = createSlug(instance.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  }
})


module.exports = {
  db,
  Page,
  User
}
